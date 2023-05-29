// Import cloudinary and multer modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure cloudinary settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new CloudinaryStorage instance to store uploaded files on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Specify the folder where uploaded files should be stored
    allowed_formats: [
      "jpeg",
      "png",
      "gif",
      "bmp",
      "tiff",
      "webp",
      "svg+xml",
      "vnd.microsoft.icon",
      "vnd.wap.wbmp",
      "x-icon",
      "x-jng",
      "x-ms-bmp",
      "x-portable-anymap",
    ], // Specify the file formats that are allowed to be uploaded
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Set the dimensions for the uploaded file and specify how it should be cropped
  },
});

// Create a new multer instance to handle file uploads
const upload = multer({ storage: storage }).single("file");

// Export the cloudinary and upload functions
module.exports = { cloudinary, upload };
