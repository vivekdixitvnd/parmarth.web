import cloudinary from "../config/cloudinary.js";
import EventMaterial from "../models/EventMaterial.js";
import fs from "fs";
import multer from "multer";
import path from "path";

// ---- MULTER SETUP ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only images and PDFs are allowed"));
  },
}).single("file");

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

      // Save to DB
      const newMaterial = new EventMaterial({
        eventName,
        description,
        fileUrl: result.secure_url,
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

// ---- CONTROLLER: Fetch photos by event name ----
export const getEventPhotos = async (req, res) => {
  try {
    const { eventName } = req.params;

    if (!eventName) {
      return res.status(400).json({ message: "Event name is required" });
    }

    const photos = await EventMaterial.find({ eventName }).sort({ createdAt: -1 });
    const urls = photos.map(photo => photo.fileUrl);

    res.status(200).json({
      eventName,
      count: urls.length,
      photos: urls,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch event photos" });
  }
};
