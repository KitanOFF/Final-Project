const User = require("../model/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uuid = require("uuid");

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

exports.getUser = async (req, res) => {
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


exports.deleteUser = async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      data: {user}
    })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    })
  }
}
// ddd

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    const imageId = uuid.v4();
    callback(null, `user-${imageId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("File type is not supported"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single("photo");

exports.update = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file) {
      const fileName = req.file.filename;
      req.body.photo = fileName;
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
