import mongoose, { Schema } from "mongoose";

const eventVolunteerSchema = new Schema({
  name: String,
  course: String,
  branch: String,
  event: String,
  rollNumber: Number,
  responsibility: String,
  academicYear: Number,
  certificateNumber: {
    type: String,
    required: true,
  },
});

const EventVolunteer = mongoose.model(
  "EventVolunteer",
  eventVolunteerSchema,
);

export default EventVolunteer;
