import cloudinary from "../config/cloudinary.js";
import EventMaterial from "../models/EventMaterial.js";
import fs from "fs";
import multer from "multer";
import path from "path";

// Setup multer inside controller
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage }).array("photos", 10); // up to 10 photos

const uploadEventMaterial = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "File upload error" });
    }

    const { event } = req.body;

    if (!event || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Event and photos required" });
    }

    try {
      const uploadedPhotos = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "event_photos",
          use_filename: true,
          unique_filename: false,
          resource_type: "image",
        });

        // Save to MongoDB
        const doc = new EventMaterial({
          eventName: event,
          description: "", // You can modify this as needed
          fileUrl: result.secure_url,
          fileType: result.resource_type,
          fileName: result.original_filename,
        });

        await doc.save();
        uploadedPhotos.push(doc);

        // Remove local file
        fs.unlinkSync(file.path);
      }

      res.status(201).json({
        message: "Photos uploaded successfully",
        photos: uploadedPhotos,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

export default uploadEventMaterial;
