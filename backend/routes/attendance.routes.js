import express from "express";
import isAuth from "../middleware/is-auth.js";
import { getAttendanceByDate, markAttendance, getVolunteerAttendanceCount, upload } from "../controllers/attendance.js";

const router = express.Router();

router.post("/api/attendance", upload.array("photos", 7), markAttendance);
router.get("/api/attendance/:date", getAttendanceByDate);
router.get("/api/attendance/total", isAuth, getVolunteerAttendanceCount);

export default router;
