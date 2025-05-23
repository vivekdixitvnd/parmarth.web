import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  mentor: {
    type: String, // This stores rollNo
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  isPresent: {
    type: Boolean,
    default: true,
  },
});

// To prevent duplicate attendance for same mentor on the same date
mentorSchema.index({ mentor: 1, date: 1 }, { unique: true });

const MentorAttendance = mongoose.model('MentorAttendance', mentorSchema); 

export default MentorAttendance;
