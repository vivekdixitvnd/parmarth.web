import express from "express";
import isAuth from "../middleware/is-auth.js";
import { getAttendanceByDate, markAttendance, upload, getAttendanceCount, getMonthlyAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.post("/", upload.array("photos", 7), markAttendance);
router.get("/total", isAuth, getAttendanceCount);
router.get('/monthly', auth, getMonthlyAttendance);
router.get("/:date", getAttendanceByDate);

export default router;
