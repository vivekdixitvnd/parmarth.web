import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = "org-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPEG, PNG, WebP images are allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const uploadOrganizationImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const filePath = req.file.path;
  const fileName = req.file.filename;

  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "organization",
        use_filename: true,
        resource_type: "image",
      });
      fs.unlinkSync(filePath);
      return res.status(200).json({ imageUrl: result.secure_url });
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
  }

  // Fallback: serve from local uploads (image already saved by multer)
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${baseUrl}/uploads/${fileName}`;
  res.status(200).json({ imageUrl });
};

export { uploadOrganizationImage, uploadMiddleware };
