import cloudinary from "../config/cloudinary.js";
import StudyMaterial from "../models/StudyMaterial.js";
import fs from "fs";

export const uploadStudyMaterial = async (req, res) => {
  try {
    const { classOrExam, subject, title, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "study_material",
    });

    // Save to DB
    const material = new StudyMaterial({
      classOrExam,
      subject,
      title,
      type,
      fileUrl: result.secure_url,
      fileType: result.resource_type,
      fileName: result.original_filename,
    });

    await material.save();
    fs.unlinkSync(req.file.path); // Clean up

    res.status(201).json({ message: "Uploaded successfully", material });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
