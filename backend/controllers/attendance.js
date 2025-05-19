import Attendance from "../models/attendance.js";

// POST: Mark/Upload Attendance
export const markAttendance = async (req, res) => {
  try {
    const { volunteers, classWise, photos } = req.body;
    const date = new Date().toISOString().split("T")[0]; // current date in YYYY-MM-DD

    // Validation
    if (!volunteers || !Array.isArray(volunteers) || volunteers.length === 0) {
      return res.status(400).json({ message: "Please provide at least one volunteer." });
    }

    if (!classWise || typeof classWise !== "object") {
      return res.status(400).json({ message: "Please provide class-wise data." });
    }

    // Calculate total students from classWise
    const totalStudents = Object.values(classWise).reduce((sum, count) => sum + count, 0);

    // Check if attendance for that date already exists
    const alreadyMarked = await Attendance.findOne({ date });
    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance for today already exists!" });
    }

    // Save to DB
    const attendance = new Attendance({
      date,
      volunteers,
      classWise,
      totalStudents,
      photos: photos || [], // optional
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (err) {
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
