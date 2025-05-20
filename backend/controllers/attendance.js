import multer from "multer";
import Attendance from "../models/attendance.js";

// Setup multer (in-memory storage for now)
// const storage = multer.memoryStorage(); // Or diskStorage if you want to save locally
// export const upload = multer({ storage });
import path from "path";
import fs from "fs";

// Ensure uploads dir exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup disk storage
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


// POST: Mark/Upload Attendance
export const markAttendance = async (req, res) => {
  try {
    // Parse JSON fields from form-data (they come in as strings)
    const { volunteers, classWise } = req.body;
    const parsedVolunteers = JSON.parse(volunteers);
    const parsedClassWise = JSON.parse(classWise);

    const date = new Date().toISOString().split("T")[0];

    // Validation
    if (!parsedVolunteers || !Array.isArray(parsedVolunteers) || parsedVolunteers.length === 0) {
      return res.status(400).json({ message: "Please provide at least one volunteer." });
    }

    if (!parsedClassWise || typeof parsedClassWise !== "object") {
      return res.status(400).json({ message: "Please provide class-wise data." });
    }

    const totalStudents = Object.values(parsedClassWise).reduce((sum, count) => sum + count, 0);

    const alreadyMarked = await Attendance.findOne({ date });
    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance for today already exists!" });
    }

    // Handle uploaded photos
    const photos = req.files?.map((file) => {
  return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
}) || [];


    const attendance = new Attendance({
      date,
      volunteers: parsedVolunteers,
      classWise: parsedClassWise,
      totalStudents,
      photos,
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// GET: Get Attendance by Date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const data = await Attendance.findOne({ date });

    if (!data) {
      return res.status(404).json({ message: "No attendance found for the given date." });
    }
    res.status(200).json({ attendance: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: /api/attendance/volunteer-count
export const getAttendanceCount = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      { $unwind: "$volunteers" },
      {
        $group: {
          _id: {
            volName: "$volunteers.volName",
            rollNo: "$volunteers.rollNo",
            branch: "$volunteers.branch"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          volName: "$_id.volName",
          rollNo: "$_id.rollNo",
          branch: "$_id.branch",
          count: 1
        }
      },
      { $sort: { count: -1 } } // optional: sort by count descending
    ]);

    res.status(200).json({ volunteers: result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


