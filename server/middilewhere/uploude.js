import multer from "multer";
import path from "path";
import fs from "fs";

/* ================= BASE UPLOAD PATH ================= */
const baseUploadPath = "uploads";

// Ensure base uploads folder exists
if (!fs.existsSync(baseUploadPath)) {
  fs.mkdirSync(baseUploadPath, { recursive: true });
}

/* ================= FILE FILTER ================= */
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG allowed"), false);
  }
};

/* ================= STUDENT PHOTO UPLOAD ================= */
const studentUploadPath = path.join(baseUploadPath, "students");
if (!fs.existsSync(studentUploadPath)) {
  fs.mkdirSync(studentUploadPath, { recursive: true });
}

const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, studentUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, "student_" + Date.now() + path.extname(file.originalname));
  },
});

export const uploadStudent = multer({
  storage: studentStorage,
  fileFilter,
});

/* ================= EVENT PHOTO UPLOAD ================= */
const eventUploadPath = path.join(baseUploadPath, "events");
if (!fs.existsSync(eventUploadPath)) {
  fs.mkdirSync(eventUploadPath, { recursive: true });
}

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, eventUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, "event_" + Date.now() + path.extname(file.originalname));
  },
});

export const uploadEventPhotos = multer({
  storage: eventStorage,
  fileFilter,
});
