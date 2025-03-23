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
} from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "10mb" }));

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

// mongoose
//   .connect(process.env.MONGOURI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Express server listening on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));

  export {app}