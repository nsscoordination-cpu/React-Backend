import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads/students folder exists
const uploadPath = "uploads";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "student_" + Date.now() + ext);
  },
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG allowed"));
};

// ✅ Upload Middleware
const uploadStudent = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 2 * 1024 * 1024 }, // 2MB      
});

export default uploadStudent;