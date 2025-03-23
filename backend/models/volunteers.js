import mongoose, { Schema } from "mongoose";

const volunteerSchema = new Schema({
  name: String,
  course: String,
  branch: String,
  rollNumber: Number,
  postHolded: String,
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;