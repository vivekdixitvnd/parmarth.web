import multer from "multer";
import MentorAttendance from "../models/mentorAttendance";
import moment from "moment";
import path from "path";
import fs from "fs";

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
    const { mentors } = req.body;

    // Validation
    if (!mentors || !Array.isArray(mentors) || mentors.length === 0) {
      return res.status(400).json({ message: "Please provide at least one mentor." });
    }

    const date = new Date().toISOString().split("T")[0];
    const results = [];
    const errors = [];

    for (const mentorData of mentors) {
      try {
        // Check if attendance already marked for this mentor today
        const existingAttendance = await MentorAttendance.findOne({
          mentor: mentorData.rollNo,
          date
        });

        if (existingAttendance) {
          errors.push({
            rollNumber: mentorData.rollNo,
            error: "Attendance already marked for today"
          });
          continue;
        }

        const attendance = new MentorAttendance({
          mentor: mentorData.rollNo,
          date,
          isPresent: true
        });

        await attendance.save();
        results.push({
          mentor: mentorData.mentorName,
          rollNumber: mentorData.rollNo,
          status: "success"
        });
      } catch (error) {
        errors.push({
          rollNumber: mentorData.rollNo,
          error: error.message
        });
      }
    }

    res.status(201).json({
      message: "Attendance marked successfully!",
      results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Get Mentor Attendance by Date
export const getMentorAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const data = await MentorAttendance.find({ date })
      .populate('mentor', 'name rollNumber branch');

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No attendance found for the given date." });
    }
    res.status(200).json({ attendance: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Get Monthly Mentor Attendance
export const getMonthlyMentorAttendance = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "Month and Year are required" });
  }

  try {
    const startDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
    const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

    const result = await MentorAttendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $lookup: {
          from: "mentors",
          localField: "mentor",
          foreignField: "rollNumber",
          as: "mentors"
        }
      },
      {
        $unwind: "$mentors"
      },
      {
        $group: {
          _id: {
            rollNumber: "$mentors.rollNumber",
            branch: "$mentors.branch"
          },
          count: { $sum: 1 },
          name: { $first: "$mentors.name" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          rollNumber: "$_id.rollNumber",
          branch: "$_id.branch",
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({ mentors: result });
  } catch (err) {
    console.error("Monthly aggregation error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET: Get Mentor Attendance Count
export const getMentorAttendanceCount = async (req, res) => {
  try {
    const result = await MentorAttendance.aggregate([
      {
        $lookup: {
          from: "mentors",
          localField: "mentor",
          foreignField: "rollNumber",
          as: "mentors"
        }
      },
      {
        $unwind: "$mentors"
      },
      {
        $group: {
          _id: {
            rollNumber: "$mentors.rollNumber",
            branch: "$mentors.branch"
          },
          count: { $sum: 1 },
          name: { $first: "$mentors.name" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          rollNumber: "$_id.rollNumber",
          branch: "$_id.branch",
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ mentors: result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}; 