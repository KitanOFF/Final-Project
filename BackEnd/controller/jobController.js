const Job = require('../model/jobModel')

exports.createJob = async (req, res) => {
    try {
        const newJob = await Job.create({...req.body, companyId: req.auth.id});
        console.log("Your new job:", newJob)
        console.log("Job body:", {companyId: req.auth.id });
        res.status(201).json({
            status: "Success",
            data: {
                newJob,
            }
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            err: err.message
        });
    }
}

exports.getAllJobs = async (req,res) => {
    try {
        const allJobs = await Job.find();
        console.log(allJobs)
        res.status(201).json({
            status: "Success",
            data: {allJobs}
        })
        
    } catch (err) {
        res.status(500).json({
            status: "fail",
            err: err.message
        });
    }
}

exports.getOneJob = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);
        console.log(job)
        res.status(201).json({
            status: "Success",
            data:{job}
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            err: err.message
        });
    }
}

exports.updateJob = async (req,res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(201).json({
            status: "Success",
            data:{job}
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            err: err.message
        });
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "Success",
            data:{job}
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            err: err.message
        });
    }
}

exports.getAllStartupJobs = async (req,res) => {
    try{
        const startupId = req.auth.id;
        const allJobs = await Job.find({ companyId: startupId });

        res.status(200).json({
            status: "success",
            data: { allJobs }
        })
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}