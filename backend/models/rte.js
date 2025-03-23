import mongoose, { Schema } from "mongoose";

const rteSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  classStudying: {
    type: String,
    // required: true,
  },
  school: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
});

const Rte = mongoose.model("Rte", rteSchema);

export default Rte;
