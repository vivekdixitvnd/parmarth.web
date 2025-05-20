import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
  classOrExam: String,
  subject: String,
  title: String,
  type: {
    type: String,
    enum: ["pdf", "video", "note"],
  },
  fileUrl: String,
  fileType: String,
  fileName: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
export default StudyMaterial;
