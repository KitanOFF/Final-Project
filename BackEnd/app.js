const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const multer = require("multer");
const path = require("path");

const db = require("./dataBase/database");

const auth = require("./handlers/authHandler");
const user = require("./handlers/userHandler");
const job = require("./handlers/jobHandler");
const application = require("./handlers/applicationHandler"); 
const { handleChatRequest } = require("./handlers/aiContoler");

console.log("handleChatRequest type:", typeof handleChatRequest);


db.init();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");


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
app.post("/api/v1/signup", upload.single("photo"), auth.signup);
app.post("/api/v1/login", auth.login);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.post('/api/v1/ai', handleChatRequest);

app.patch("/api/v1/uploadphoto/:id", user.uploadUserPhoto, user.update);
app.get("/api/v1/users", auth.getUsers);
app.get("/api/v1/user/:id", auth.getOneUser); 
app.delete("/api/v1/user/:id", auth.deleteUser);
app.patch("/api/v1/updateUser/:id", auth.update);

app.get('/api/v1/jobs', job.getAllJobs);
app.get('/api/v1/jobs/:id', job.getOneJob);
app.post('/api/v1/job', job.create);
app.patch('/api/v1/job/:id', job.updateJob);
app.delete('/api/v1/job/:id', job.deleteJob);
app.get('/api/v1/jobsstartup', job.getAllJobsForStartup);
app.post('/api/v1/jobs/chat', job.chatAboutJobs);


app.get('/api/v1/application', application.getAllApps);
app.get("/api/v1/application/mentors-startup", application.getApplicationsForStartup);
app.get('/api/v1/application/:id', user.getUser);
// nad ova raboti s eoke 
app.post('/api/v1/application', application.create);
app.get('/api/v1/application/mentor/:mentorId', application.applicationByMentor);
app.patch('/api/v1/application/:id', application.updateApp);
app.delete('/api/v1/application/:id', application.deleteApp);
app.get("/api/v1/mentor/offers", application.getMentorOffersJob);
app.get("/api/v1/startup/applications", application.getApplicationsForStartup);


// davat problem ako e od komentirana a gi imat sive vo USER  
// app.get("/api/v1/getMentors", user.getMentors);//davat problem ako e od komentirana 
// app.get("/api/v1/startup/top-mentors", application.topMentors);
// app.get("/api/v1/startup/mentordetailsforstartup/:mentorId", user.getMentorDetailsForStartup);


app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err.message, "Server cannot start");
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
