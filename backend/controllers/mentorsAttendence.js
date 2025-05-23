import multer from "multer";
import MentorAttendance from "../models/mentorAttendance.js";
import moment from "moment";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// POST: Mark Mentor Attendance
export const markMentorAttendance = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { mentors } = req.body;

    if (!mentors || !Array.isArray(mentors) || mentors.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of mentor data",
      });
    }

    // Validate mentor data and check for duplicates in input
    const rollSet = new Set();
    for (const mentor of mentors) {
      if (!mentor.mentorName || !mentor.rollNo || !mentor.branch) {
        return res.status(400).json({
          success: false,
          message: "Each mentor must have a name, rollNo, and branch",
        });
      }
      if (rollSet.has(mentor.rollNo)) {
        return res.status(400).json({
          success: false,
          message: `Duplicate roll number in request: ${mentor.rollNo}`,
        });
      }
      rollSet.add(mentor.rollNo);
    }

    const date = new Date().toISOString().split("T")[0];

    // Check if attendance for this date already exists
    const existingAttendance = await MentorAttendance.findOne({ date });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance for this date has already been marked",
      });
    }

    // Format mentor data
    const mentorArray = mentors.map((m) => ({
      name: m.mentorName,
      rollNo: m.rollNo,
      branch: m.branch,
    }));

    // Save all mentors together
    const attendance = new MentorAttendance({
      mentor: mentorArray,
      date,
    });

    await attendance.save();

    console.log("✅ Attendance saved for date:", date);
    res.status(201).json({
      success: true,
      message: "Mentor attendance marked successfully!",
      savedMentors: mentorArray.length,
    });
  } catch (err) {
    console.error("❌ Server error in markMentorAttendance:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// GET: Get Mentor Attendance by Date
export const getMentorAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date parameter is required",
      });
    }

    const data = await MentorAttendance.findOne({ date });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No attendance found for the given date",
      });
    }

    res.status(200).json({
      success: true,
      attendance: data,
    });
  } catch (err) {
    console.error("Server error in getMentorAttendanceByDate:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// GET: Total attendance per mentor
export const getMentorAttendanceCount = async (req, res) => {
  try {
    const result = await MentorAttendance.aggregate([
      { $unwind: "$mentor" },
      {
        $group: {
          _id: {
            rollNo: "$mentor.rollNo",
            branch: "$mentor.branch",
          },
          count: { $sum: 1 },
          name: { $first: "$mentor.name" }
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          rollNo: "$_id.rollNo",
          branch: "$_id.branch",
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ mentors: result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Monthly mentor attendance
export const getMonthlyMentorAttendance = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "Month and year are required" });
  }

  try {
    const startDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
    const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

    const result = await MentorAttendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      { $unwind: "$mentor" },
      {
        $group: {
          _id: {
            rollNo: "$mentor.rollNo",
            branch: "$mentor.branch",
          },
          count: { $sum: 1 },
          name: { $first: "$mentor.name" }
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          rollNo: "$_id.rollNo",
          branch: "$_id.branch",
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ mentors: result });
  } catch (err) {
    console.error("Monthly mentor error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


