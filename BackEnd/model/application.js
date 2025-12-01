const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
  jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
  applicationType: {
    type: String,
    enum: ['mentorToCompany', 'companyToMentor'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  acceptedStatus: {
    type: String,
    enum: ['done', 'rejected', 'in progress'],
    default: 'in progress'
  }
}, { timestamps: true });

const Application =mongoose.model('application',applicationSchema)
module.exports = Application
