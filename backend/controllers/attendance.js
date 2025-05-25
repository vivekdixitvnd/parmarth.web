import multer from "multer";
import Attendance from "../models/attendance.js";
import moment from "moment";

import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).array("photos", 10); 
// const uploadDir = path.join("uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// export const upload = multer({ storage });


// POST: Mark/Upload Attendance
export const markAttendance = async (req, res) => {
  try {
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
  //   const photos = req.files?.map((file) => {
  // return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

      const photos = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "event_photos",
          use_filename: true,
          unique_filename: false,
          resource_type: "image",
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

export const getMonthlyAttendance = async (req, res) => {
  const { month, year } = req.query;
  console.log(req.query);

  if (!month || !year) {
    return res.status(400).json({ error: "Month and Year are required" });
  }

  try {
    const startDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
    const endDate = moment(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");

    console.log("Searching between:", startDate, "to", endDate);

    const result = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $unwind: "$volunteers"
      },
      {
        $group: {
          _id: {
            rollNo: "$volunteers.rollNo",
            branch: "$volunteers.branch",
          },
          count: { $sum: 1 },
          volName: { $first: "$volunteers.volName" }
        }
      },
      {
        $project: {
          _id: 0,
          volName: 1,
          rollNo: "$_id.rollNo",
          branch: "$_id.branch",
          count: 1
        }
      },
      {
         $sort: { count: -1 } 
      }
    ]);

    res.status(200).json({ volunteers: result });
    console.log("Monthly attendance result:", result);
  } catch (err) {
    console.error("Monthly aggregation error:", err);
    res.status(500).json({ error: "Internal Server Error" });
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
            rollNo: "$volunteers.rollNo",
            branch: "$volunteers.branch"
          },
          count: { $sum: 1 },
          volName: { $first: "$volunteers.volName" } // pick the first name found
        }
      },
      {
        $project: {
          _id: 0,
          volName: 1,
          rollNo: "$_id.rollNo",
          branch: "$_id.branch",
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ volunteers: result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
