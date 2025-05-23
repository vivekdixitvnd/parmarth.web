import express from 'express';
import isAuth from "../middleware/is-auth.js";
import { getMentorAttendanceByDate, markMentorAttendance, getMentorAttendanceCount, getMonthlyMentorAttendance } from "../controllers/mentorsAttendence.js";

const router = express.Router();

// Get all mentors
router.get('/', markMentorAttendance);
router.get("/total", isAuth, getMentorAttendanceCount);
router.get('/monthly', isAuth, getMonthlyMentorAttendance);
router.get("/:date", getMentorAttendanceByDate);

export default router; 