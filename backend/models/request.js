import mongoose, {Schema} from "mongoose";

const requestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    require: true,
  },
  postHolded: {
    type: String,
  },
  event: {
    type: String,
  },
  dataExist: {
    type: Boolean,
    required: true,
  },
  academicYear: {
    type: Number,
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
