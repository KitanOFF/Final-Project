require('dotenv').config({ path: `${__dirname}/config.env` });
const express = require('express');
const cookieParser = require('cookie-parser');
const database = require('./dataBase/database');
const { expressjwt: jwt } = require("express-jwt");
const cors = require("cors");
const { handleChatRequest } = require('./handlers/aiContoler');
const auth = require("./controller/authController")
const job = require("./controller/jobController")
const application = require("./controller/appController")
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());;

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/uploads", express.static("public"))

database.connectToDataBase();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});


const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false);
  }
};


const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.use(
  jwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET,
    getToken: (req) => {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      }
      if (req.cookies?.jwt) return req.cookies.jwt;
      return null;
    },
  }).unless({
    path: ["/api/v1/signup", "/api/v1/login","/api/v1/ai"],
  })
);

app.post('/api/v1/signup', upload.single("photo"), auth.signup);
app.patch("/api/v1/uploadphoto/:id", upload.single("photo"), auth.uploadUserPhoto, auth.update);


const PORT = 1000; // Or from process.env.PORT
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


app.post('/api/v1/login',auth.login );
app.post('/api/v1/ai', handleChatRequest);

app.get("/api/v1/users", auth.getUsers);
app.get("/api/v1/user/:id", auth.getUser);
app.delete("/api/v1/user/:id", auth.deleteUser);
app.patch("/api/v1/updateUser/:id", auth.update)

app.post("/api/v1/job", job.createJob);
app.get("/api/v1/jobs", job.getAllJobs);
app.get("/api/v1/jobs/:id", job.getOneJob);
app.delete("/api/v1/job/:id", job.deleteJob);
app.patch("/api/v1/job/:id", job.updateJob);
app.get("/api/v1/jobs-startup", job.getAllStartupJobs)

app.post("/api/v1/application", application.create);
app.get("/api/v1/applications", application.getAllApps);
app.get("/api/v1/application/:id", application.getApp); 
app.delete("/api/v1/application/:id", application.deleteApp);
app.patch("/api/v1/application/:id", application.updateApp);
app.get("/api/v1/application/mentor/:id", application.applicationByMentor);
app.get("/api/v1/offers/mentor", application.getMentorOffersJob);
app.get("/api/v1/applications/startup", application.getApplicationsForStartup);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
