import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import mongoose from "mongoose";
import path from "path";
import fs from "fs";
// const PORT = process.env.PORT || 8080;
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cors from "cors"



//Routes
import {
  requestDataRoute,
  authRoute,
  rteRoute,
  volunteersRoute,
  eventVolunteersRoute,
  postRoute,
  approveRequestRoute,
  status2FARoute,
  verify2FARoute,
  imgUrlRoute,
  signature,
  donateEmail,
  StudyMaterial,
  otpLogin,
  attendanceRoute,
} from "./routes/index.js";

const app = express();

app.use(cors({
  // origin: 'http://localhost:5173',
  // origin: 'https://parmarth-web.vercel.app',
  // origin: 'https://parmarth-iet.onrender.com',

  origin: 'https://parmarth.ietlucknow.ac.in',

  credentials: true,
}));
app.options('*', cors()); // handle preflight for all routes

app.use(express.json());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const __dirname = path.resolve();

// Construct the logs directory path
const logsDirectory = path.join(__dirname, "logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, "access.log"),
  { flags: "a" },
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(requestDataRoute);
app.use(authRoute);
app.use(rteRoute);
app.use(volunteersRoute);
app.use(eventVolunteersRoute);
app.use(postRoute);
app.use(approveRequestRoute);
app.use(status2FARoute);
app.use(verify2FARoute);
app.use(imgUrlRoute);
app.use(signature);
app.use(donateEmail);
app.use('/api/materials', StudyMaterial);
app.use("/api/attendance",attendanceRoute);
app.use(otpLogin);

app.use(express.static("dist"));



  export {app}
