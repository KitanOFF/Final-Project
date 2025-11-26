const User = require("../model/model"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mongoose = require("mongoose");

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      skills,
      desc,
      representative,
      address,
    } = req.body;
    console.log(req.body);

    let photoFilename = null;
    if (req.file) {
      photoFilename = req.file.filename;
    }

    if (
      role === "mentor" &&
      (req.body.representative || req.body.address || req.body.jobsPosted)
    ) {
      return res.status(400).json({
        message:
          "Mentor can not include representative,address or jobs posted!",
      });
    }

    if (
      role === "startup" &&
      (req.body.skills || req.body.phone || req.body.acceptedJobs)
    ) {
      return res.status(400).json({
        message: "Startup can not include skills,phone or accepted jobs!",
      });
    }
    
    const newUser = await User.create({
      name: name || "",
      email,
      password,
      role,
      phone,
      skills,
      desc,
      representative,
      address,
      photo: photoFilename,
      
    });

    res.status(201).json({
      status: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err.message,
    });
  }
};


exports.uploadUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.body.photo = req.file.filename;
  next();
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ status: "fail", message: err.message });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 min
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;

    res.status(200).json({
      status: "success",
      message: "Reset link generated",
      resetUrl,
      resetToken,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getUsers = async (req,res) => {
  try{
    const users = await User.find();
    res.json(users)
  }catch(err){
    res.status(500).json({
      message: err.message
    })
  }
}

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const populatedUser =
      user.role === "startup"
        ? await user.populate("jobsPosted")
        : await user.populate("acceptedJobs");

    res.status(200).json({
      status: "success",
      user: populatedUser, 
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getMentors = async (req, res) => {
  try {
    const allMentors = await User.find({ role: 'mentor' });

    console.log("All mentors found:", allMentors.length);

    res.status(200).json({
      status: "success",
      results: allMentors.length,
      data: allMentors,
    });
  } catch (err) {
    console.error("Error fetching mentors:", err);
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