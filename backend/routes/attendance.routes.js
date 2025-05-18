import express from "express";
import { getAttendanceByDate, markAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.post("/api/attendance", markAttendance);
router.get("/api/attendance/:date", getAttendanceByDate);

export default router;
