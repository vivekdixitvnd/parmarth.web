import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  mentor: [
    {
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
    },
  ],
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true, // only one document per date
  },
});

const MentorAttendance = mongoose.model('MentorAttendance', mentorSchema);

export default MentorAttendance;
