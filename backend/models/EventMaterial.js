import mongoose from "mongoose";

const eventMaterialSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: String,
  fileType: String,
  fileName: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EventMaterial", eventMaterialSchema);
