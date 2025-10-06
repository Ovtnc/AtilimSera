const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads with memory storage first
const storage = multer.memoryStorage();

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  // Get file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif', '.mp4', '.mov', '.avi', '.wmv', '.webm'];
  const allowedMimeTypes = ['image/', 'video/'];
  
  // Check by MIME type or file extension
  const isValidMimeType = allowedMimeTypes.some(type => file.mimetype.startsWith(type));
  const isValidExtension = allowedExtensions.includes(ext);
  
  if (isValidMimeType || isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error('Sadece görsel ve video dosyaları yüklenebilir!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
    files: 1 // Only one file at a time
  }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Dosya boyutu 50MB\'dan küçük olmalıdır' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Sadece bir dosya yüklenebilir' });
    }
  }
  
  if (err.message === 'Sadece görsel ve video dosyaları yüklenebilir!') {
    return res.status(400).json({ error: err.message });
  }
  
  next(err);
};

module.exports = {
  upload: upload.single('image'),
  handleUploadError
};
