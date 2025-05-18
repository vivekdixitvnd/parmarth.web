import Attendance from "../models/attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const { name, rollNo, branch } = req.body;
    const date = new Date().toISOString().split("T")[0]; // current date in YYYY-MM-DD

    if (!rollNo || !branch) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const attendance = new Attendance({ name, rollNo, branch, date });
    console.log(attendance);
    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const data = await Attendance.find({ date });

    res.status(200).json({ attendance: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
