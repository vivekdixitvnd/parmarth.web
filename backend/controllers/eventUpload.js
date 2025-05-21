import cloudinary from "../config/cloudinary.js";
import EventMaterial from "../models/EventMaterial.js";
import fs from "fs";

export const uploadEventMaterial = async (req, res) => {
  try {
    const { eventName, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "event_photos",
      use_filename: true,
      unique_filename: false,
      access_mode: "public",
    });

    // Save to database
    const eventMaterial = new EventMaterial({
      eventName,
      description,
      fileUrl: result.secure_url,
      fileType: result.resource_type,
      fileName: result.original_filename,
    });

    await eventMaterial.save();
    fs.unlinkSync(req.file.path); // Delete local temp file

    res.status(201).json({ message: "Event photo uploaded successfully", eventMaterial });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
