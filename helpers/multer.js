const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the upload directory path for both images and MP3 files
const uploadDir = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the destination to 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Add the correct extension
  },
});

// Filter to allow only certain file types for songImage and songURL
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "songImage" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for songImage"), false);
  }

  if (file.fieldname === "songURL" && file.mimetype !== "audio/mpeg") {
    return cb(new Error("Only .mp3 files are allowed for songURL"), false);
  }

  cb(null, true); // Allow the file
};

// Set up multer to handle multiple fields (songImage and songURL)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Apply the file filter
});

module.exports = upload;
