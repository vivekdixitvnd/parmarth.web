import express from "express";
import isAuth from "../middleware/is-auth.js";
import { getAttendanceByDate, markAttendance, getAttendanceCount, upload, getMonthlyAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.post("/", upload.array('photos'), markAttendance);
router.get("/total", isAuth, getAttendanceCount);
router.get('/monthly', isAuth, getMonthlyAttendance);
router.get("/:date", getAttendanceByDate);

export default router;
