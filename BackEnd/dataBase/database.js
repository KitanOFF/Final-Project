const mongoose = require("mongoose");

const init = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.log("DB connection error:", err));
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

module.exports = { init };
