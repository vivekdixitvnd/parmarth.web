import cloudinary from "../config/cloudinary.js";
import StudyMaterial from "../models/StudyMaterial.js";
import fs from "fs";

export const uploadStudyMaterial = async (req, res) => {
  try {
    const { classOrExam, subject, title, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "study_material",
      use_filename: true,
      unique_filename: false,
      access_mode: "public",
    });

    // Create preview URL for browser viewing
    const fileUrl = result.secure_url.replace('/upload/', '/upload/fl_attachment:preview/');

    // Save to database
    const material = new StudyMaterial({
      classOrExam,
      subject,
      title,
      type,
      fileUrl,
      fileType: result.resource_type,
      fileName: result.original_filename,
    });

    await material.save();
    fs.unlinkSync(req.file.path); // Clean up local temp file

    res.status(201).json({ message: "Uploaded successfully", material });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
