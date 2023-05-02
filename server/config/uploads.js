const cloudinary = require('./cloudinary'); // import the Cloudinary config object

const upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = upload;
