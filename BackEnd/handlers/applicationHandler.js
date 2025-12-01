const Application = require("../model/application");
const Job = require("../model/jobModel");
const User = require("../model/model");
const mongoose = require("mongoose")

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

      const existApp = await Application.findOne({
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

      newApp = await Application.create({
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
      const existApp = await Application.findOne({
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

      newApp = await Application.create({
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
      const allApps = await Application.find()
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
      const app = await Application.findById(req.params.id)
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
    const { acceptedStatus, status } = req.body;

    const existingApp = await Application.findById(req.params.id);
    if (!existingApp) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }
    let newStatus = status;
    
    if (!newStatus && acceptedStatus) {
      if (acceptedStatus === "in progress" || 
          acceptedStatus === "done" || 
          acceptedStatus === "rejected") {
        if (existingApp.applicationType === "companyToMentor" && acceptedStatus === "in progress") {
          newStatus = "assigned";
        } else {
          newStatus = existingApp.status;
        }
      } else {
        newStatus = existingApp.status;
      }
    } else if (!newStatus) {
      newStatus = existingApp.status;
    }

    const updateData = {};
    
    if (acceptedStatus !== undefined) {
      updateData.acceptedStatus = acceptedStatus;
    }
    
    if (newStatus) {
      updateData.status = newStatus;
    }

    if (updateData.status && !["pending", "assigned"].includes(updateData.status)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid status value. Must be one of: pending, assigned`,
      });
    }

    if (updateData.acceptedStatus && !["done", "rejected", "in progress"].includes(updateData.acceptedStatus)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid acceptedStatus value. Must be one of: done, rejected, in progress`,
      });
    }

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("jobId mentorId companyId");

    if (!app) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found after update",
      });
    }

    res.status(200).json({
      status: "success",
      data: app,
    });
  } catch (err) {
    console.error("Update app error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

  exports.deleteApp = async (req, res) => {
    try {
      const app = await Application.findByIdAndDelete(req.params.id);
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
    const { id: userId, role } = req.auth;
    const mentorId = req.params.mentorId || req.params.id;

    if (!userId || !mentorId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing userId or mentorId in request",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid mentor ID",
      });
    }

    if (role !== "mentor") {
      return res.status(403).json({
        status: "fail",
        message: "Only mentors can access their applications",
      });
    }

    if (userId !== mentorId) {
      return res.status(403).json({
        status: "fail",
        message: "Mentors can only view their own applications!",
      });
    }

    const applications = await Application.find({
      mentorId: new mongoose.Types.ObjectId(mentorId),
    })
      .populate("jobId", "title description"); 

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: applications,
    });
  } catch (err) {
    console.error("❌ Error in applicationByMentor:", err);
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
      const offers = await Application.find({
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
      const userRole = req.auth.role;

      if (userRole !== "startup") {
        return res.status(400).json({
          status: "fail",
          message: "Only startups can view their applications",
        });
      }

      const apps = await Application.find({ companyId: startupId })
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

  exports.getMentorDetailsForStartup = async (req, res) => {
  try {
    const startupId = req.auth.id;
    const mentorId = req.params.id;
    const mentor = await User.findById(mentorId).select(
      "name skills desc email phone"
    );
    if (!mentor)
      return res
        .status(404)
        .json({ status: "fail", message: "Mentor not found" });
    const applications = await Application.find({
      mentorId,
      companyId: startupId,
    }).populate("jobId");
    const assignedJobs = applications.filter(
      (app) => app.status === "accepted"
    );
    const pendingJobs = applications.filter((app) => app.status === "pending");
    const doneJobs = applications.filter(
      (app) => app.acceptedStatus === "done"
    );
    const inProgressJobs = applications.filter(
      (app) => app.acceptedStatus === "in progress"
    );
    const rejectedJobs = applications.filter(
      (app) => app.acceptedStatus === "rejected"
    );
    const mapJob = (arr) =>
      arr.map((app) => ({
        applicationId: app._id,
        _id: app.jobId._id,
        title: app.jobId.title,
        status: app.status,
        acceptedStatus: app.acceptedStatus,
        applicationType: app.applicationType,
      }));
    res.status(200).json({
      status: "success",
      data: {
        mentor,
        assignedJobs: mapJob(assignedJobs),
        pendingJobs: mapJob(pendingJobs),
        doneJobs: mapJob(doneJobs),
        inProgressJobs: mapJob(inProgressJobs),
        rejectedJobs: mapJob(rejectedJobs),
      },
    });
  } catch (err) {
    console.error("Error fetching mentor details:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};