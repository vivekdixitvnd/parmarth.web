import mongoose from "mongoose";

const eventMaterialSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: String,
  fileName: String,
}, {
  timestamps: true,
});

export default mongoose.model("EventMaterial", eventMaterialSchema);
