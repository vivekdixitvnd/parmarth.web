import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: {
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
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
  },
});

const MentorAttendance = mongoose.model('Mentor', mentorSchema); 
export default MentorAttendance;
