import express from "express";
import isAuth from "../middleware/is-auth.js";
import { getAttendanceByDate, markAttendance, getAttendanceCount, getMonthlyAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/total", isAuth, getAttendanceCount);
router.get('/monthly', isAuth, getMonthlyAttendance);
router.get("/:date", getAttendanceByDate);

export default router;
