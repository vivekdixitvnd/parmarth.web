import mongoose from "mongoose";

const eventMaterialSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  fileUrl: String,
  fileType: String,
  fileName: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const EventMaterial = mongoose.model("EventMaterial", eventMaterialSchema);

export default EventMaterial;
