const Job = require("../model/jobModel");


exports.create = async (req, res) => {
  try {
    const newJob = await Job.create({ ...req.body, companyId: req.auth.id });
    res.status(201).json({ status: "success", data: { newJob } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find().populate("companyId", "name photo");
    res.status(200).json({ status: "success", data: { allJobs } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getOneJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({ status: "success", data: { job } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "success", data: { job } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getAllJobsForStartup = async (req, res) => {
  try {
    const allJobs = await Job.find({ companyId: req.auth.id });
    res.status(200).json({ status: "success", data: { allJobs } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};


exports.chatAboutJobs = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    
    const reply = await handleChatRequest(prompt);

    res.status(200).json({
      status: "success",
      message: reply,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
