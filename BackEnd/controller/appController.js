const applicationSchema =require("../model/application")
const Job = require("../model/jobModel");
const User = require("../model/model")

exports.create = async (req, res) => {
  try {
    const userId = req.auth.id;
    const { jobId, mentorId, jobData } = req.body;
    const userRole = req.auth.role;

    let newApp;

    if (userRole === "mentor") {
      if (!jobId) {
        return res.status(400).json({
          status: "Fail",
          message: "Please enter your Job Id",
        });
      }
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(400).json({
          status: "Fail",
          message: "Job not found!",
        });
      }
      const companyId = job.companyId;

      const existApp = await applicationSchema.findOne({
        mentorId: userId,
        jobId,
        companyId,
        applicationType: "mentorToCompany",
      });

      if (existApp) {
        return res.status(400).json({
          status: "fail",
          message: "You cannot apply for this job again!",
        });
      }

      newApp = await applicationSchema.create({
        mentorId: userId,
        jobId,
        companyId,
        applicationType: "mentorToCompany",
      });
    } else if (userRole === "startup") {
      if (!mentorId) {
        return res.status(400).json({
          status: "Fail",
          message: "Please enter your Mentor Id!",
        });
      }
      const mentor = await User.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({
          status: "Fail",
          message: "Mentor not found!",
        });
      }
      let newJob = jobId;

      if (!jobId && jobData) {
        const job = await Job.create({
          ...jobData,
          companyId: userId,
        });
        newJob = job._id;
      } else if (!jobId) {
        return res.status(400).json({
          status: "Fail",
          message: "Please enter your Job Id!",
        });
      }
      const existApp = await applicationSchema.findOne({
        mentorId,
        companyId: userId,
        jobId: newJob,
        applicationType: "companyToMentor",
      });

      if (existApp) {
        return res.status(400).json({
          status: "fail",
          message: "You cannot offer this job to this mentor again!",
        });
      }

      newApp = await applicationSchema.create({
        mentorId,
        companyId: userId,
        jobId: newJob,
        applicationType: "companyToMentor",
        status: "pending",
      });
    } else {
      return res.status(400).json({
        status: "Fail",
        message: "Fail",
      });
    }
    res.status(200).json({
      status: "Success",
      data: { newApp },
    });
    console.log(newApp);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err.message,
    });
  }
}
  exports.getAllApps = async (req, res) => {
    try {
      const allApps = await applicationSchema.find()
        .populate("jobId")
        .populate("mentorId")
        .populate("companyId");

      res.status(200).json({
        status: "success",
        data: { allApps },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.getApp = async (req, res) => {
    try {
      const app = await applicationSchema.findById(req.params.id)
        .populate("jobId")
        .populate("mentorId")
        .populate("companyId");

      if (!app) {
        return res.status(404).json({
          status: "fail",
          message: "Application not found!",
        });
      }

      res.status(200).json({
        status: "success",
        data: { app },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.updateApp = async (req, res) => {
    try {
      const acceptedStatus = req.body;
      const newStatus =
        acceptedStatus === "in progress" ||
        acceptedStatus === "done" ||
        acceptedStatus === "rejected"
          ? "accepted"
          : "pending";

      const app = await applicationSchema.findByIdAndUpdate(
        req.params.id,
        {
          acceptedStatus,
          status: newStatus,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("jobId mentorId companyId");

      res.status(200).json({
        status: "success",
        data: app,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.deleteApp = async (req, res) => {
    try {
      const app = await applicationSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "Success",
        data: app,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.applicationByMentor = async (req, res) => {
    try {
      const { id: userId, userRole } = req.auth;
      const mentorId = req.params;
      console.log(req.auth);

      if (userRole === "mentor") {
        if (userId !== mentorId) {
          return res.status(400).json({
            status: "fail",
            message: "Only mentors can view their applications",
          });
        }
      }

      const applications = await applicationSchema.find({ mentorId })
        .populate("jobId", "title description")
        .populate("companyId", "name email");
      res.status(200).json({
        status: "success",
        data: applications,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.getMentorOffersJob = async (req, res) => {
    try {
      const mentorId = req.user.id;
      if (!mentorId) {
        return res.status(404).json({
          status: "fail",
          message: "Mentor Id not found!",
        });
      }
      const offers = await applicationSchema.find({
        mentorId,
        applicationType: "companyToMentor",
        status: "pending",
      })
        .populate("jobId", "title description")
        .populate("companyId", "name photo");
      res.status(200).json({
        status: "success",
        data: { offers },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.getApplicationsForStartup = async (req, res) => {
    try {
      const startupId = req.auth.id;
      const userRole = req.auth.userRole;

      if (userRole !== "startup") {
        return res.status(400).json({
          status: "fail",
          message: "Only startups can view their applications",
        });
      }

      const apps = await applicationSchema.find({ companyId: startupId })
        .populate("jobId", "title description")
        .populate("mentorId", "name email photo");
      res.status(200).json({
        status: "success",
        data: apps,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  };