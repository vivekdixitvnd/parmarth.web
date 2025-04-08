import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
  uploadedBy: {
    type: String, // "faculty1" or "faculty2"
    required: true,
  },
  signatureUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Signature = mongoose.model("Signature", signatureSchema);
export default Signature;
