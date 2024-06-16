import multer from "multer";
import path from "path";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mpeg",
  ];
  console.log(`File MIME type: ${file.mimetype}`);

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Images and videos only! Received MIME type: ${file.mimetype}`),
      false
    );
  }
};

// Initialize Multer with storage settings and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
