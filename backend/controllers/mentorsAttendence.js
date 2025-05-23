import multer from "multer";
import MentorAttendance from "../models/MentorAttendance.js";
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
    console.log("Received request body:", req.body); // Debug log

    const { mentors } = req.body;

    // Input validation
    if (!mentors) {
      console.log("No mentors data provided"); // Debug log
      return res.status(400).json({ 
        success: false,
        message: "Mentors data is required" 
      });
    }

    // Ensure mentors is an array
    const mentorsArray = Array.isArray(mentors) ? mentors : [mentors];
    console.log("Processing mentors:", mentorsArray); // Debug log
    
    if (mentorsArray.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide at least one mentor" 
      });
    }

    const date = new Date().toISOString().split("T")[0];
    const results = [];
    const errors = [];

    for (const mentorData of mentorsArray) {
      try {
        // Validate mentor data
        if (!mentorData.rollNo || !mentorData.mentorName) {
          console.log("Invalid mentor data:", mentorData); // Debug log
          errors.push({
            rollNumber: mentorData.rollNo || 'unknown',
            error: "Invalid mentor data: rollNo and mentorName are required"
          });
          continue;
        }

        // Check for existing attendance
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

        // Create new attendance record
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
        console.error(`Error processing mentor ${mentorData.rollNo}:`, error);
        errors.push({
          rollNumber: mentorData.rollNo,
          error: error.message || "Failed to process attendance"
        });
      }
    }

    // Send response
    const response = {
      success: true,
      message: "Attendance marked successfully!",
      results,
      errors: errors.length > 0 ? errors : undefined
    };
    
    console.log("Sending response:", response); // Debug log
    res.status(201).json(response);
  } catch (err) {
    console.error("Server error in markMentorAttendance:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
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
        message: "Date parameter is required" 
      });
    }

    const data = await MentorAttendance.find({ date })
      .populate('mentor', 'name rollNumber branch');

    if (!data || data.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No attendance found for the given date" 
      });
    }

    res.status(200).json({ 
      success: true,
      attendance: data 
    });
  } catch (err) {
    console.error("Server error in getMentorAttendanceByDate:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });
  }
};

// GET: Get Monthly Mentor Attendance
export const getMonthlyMentorAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ 
        success: false,
        message: "Month and Year are required" 
      });
    }

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
          as: "mentorDetails"
        }
      },
      {
        $unwind: "$mentorDetails"
      },
      {
        $group: {
          _id: {
            rollNumber: "$mentorDetails.rollNumber",
            branch: "$mentorDetails.branch"
          },
          count: { $sum: 1 },
          name: { $first: "$mentorDetails.name" }
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

    res.status(200).json({ 
      success: true,
      mentors: result 
    });
  } catch (err) {
    console.error("Server error in getMonthlyMentorAttendance:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });
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