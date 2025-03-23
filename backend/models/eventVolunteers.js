import mongoose, { Schema } from "mongoose";

const eventVolunteerSchema = new Schema({
  name: String,
  course: String,
  branch: String,
  event: String,
  rollNumber: Number,
  responsibility: String,
  academicYear: Number,
  certificateNumber: Number,
});

const EventVolunteer = mongoose.model(
  "EventVolunteer",
  eventVolunteerSchema,
);

export default EventVolunteer;