import express from "express";
import isAuth from "../middleware/is-auth.js";
import { getAttendanceByDate, markAttendance, upload, getAttendanceCount } from "../controllers/attendance.js";

const router = express.Router();

router.post("/", upload.array("photos", 7), markAttendance);
router.get("/total", isAuth, getAttendanceCount);
router.get("/:date", getAttendanceByDate);

export default router;
