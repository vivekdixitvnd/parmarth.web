import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Math.random().toString(36).slice(-6) + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("excelFile");

export default upload