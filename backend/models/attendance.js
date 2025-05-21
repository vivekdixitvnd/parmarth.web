import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date, // Format: YYYY-MM-DD
    required: true,
    unique: true,
  },
  volunteers: [
    {
      volName: {
        type: String,
        required: true,
      },
      rollNo: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
    },
  ],
  classWise: {
    type: Map,
    of: Number, // Example: { "Class A": 32, "Class B": 27 }
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String, // URLs of uploaded photos
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
