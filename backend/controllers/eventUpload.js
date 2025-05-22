import cloudinary from "../config/cloudinary.js";
import EventMaterial from "../models/EventMaterial.js";
import fs from "fs";


// ---- CONTROLLER: Upload event material ----
export const uploadEventMaterial = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || "Upload failed" });
    }

    const { eventName, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "event_photos",
        use_filename: true,
        unique_filename: false,
        access_mode: "public",
      });

          // Create preview URL for browser viewing
    const fileUrl = result.secure_url.replace('/upload/', '/upload/fl_attachment:preview/');

      // Save to DB
      const newMaterial = new EventMaterial({
        eventName,
        description,
        fileUrl,
        fileType: result.resource_type,
        fileName: result.original_filename,
      });

      await newMaterial.save();
      fs.unlinkSync(req.file.path); // clean temp file

      res.status(201).json({ message: "Uploaded successfully", data: newMaterial });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
};
