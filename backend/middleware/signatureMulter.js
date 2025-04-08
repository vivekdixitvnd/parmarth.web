import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads/signatures directory exists
const uploadPath = path.join(__dirname, "../uploads/signatures");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Optional: filter for only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (PNG, JPG) are allowed!"), false);
  }
};

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  // filename: function (req, file, cb) {
  //   // Use original name with timestamp fallback
  //   const ext = path.extname(file.originalname);
  //   const baseName = path.basename(file.originalname, ext);
  //   const safeBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, ""); // Sanitize
  //   const timestamp = Date.now();
  //   cb(null, `${safeBaseName}-${timestamp}${ext}`);
  // },
  filename: function (req, file, cb) {
    // decide based on which faculty is uploading
    const uploadedBy = req.query.uploadedBy; // 'faculty1' or 'faculty2'
  console.log("uploadedBy (from query):", uploadedBy);

  let fileName = "signature.png"; // fallback
  if (uploadedBy === "faculty1") fileName = "sig1.png";
  else if (uploadedBy === "faculty2") fileName = "sig2.png";
    cb(null, fileName);
  },
});

// Final upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB max file size
  },
});

export default upload;
