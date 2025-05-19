import express from "express";
import { getAttendanceByDate, markAttendance, upload } from "../controllers/attendance.js";

const router = express.Router();

router.post("/api/attendance", upload.array("photos", 7), markAttendance);
router.get("/api/attendance/:date", getAttendanceByDate);

export default router;
