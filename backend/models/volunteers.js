import mongoose, { Schema } from "mongoose";

const volunteerSchema = new Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  rollNumber: Number,
  postHolded: { type: String, required: true },
  session: { type: String, required: true },
  refrence: { type: String, unique: true},
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
