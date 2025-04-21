import mongoose, { Schema } from "mongoose";

const volunteerSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String},
  rollNumber: Number,
  email: String,
  postHolded: { type: String, required: true },
  session: { type: String, required: true },
  refrence: { type: String, required: true, unique: false},
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
