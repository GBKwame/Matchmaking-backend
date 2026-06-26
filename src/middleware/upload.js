const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles/photos',
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) return cb(null, true);
  cb(new Error('Invalid file type. Only jpeg, jpg, png, webp allowed.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 },
});

module.exports = upload;