const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// @desc    Upload single image
// @route   POST /api/upload/single
// @access  Private
exports.uploadSingle = (req, res) => {
  upload.single('photo')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    } else if (err) {
      return res.status(400).json({ message: 'Invalid file type', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    res.status(200).json({
      success: true,
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.filename
    });
  });
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
exports.uploadMultiple = (req, res) => {
  upload.array('photos', 10)(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    } else if (err) {
      return res.status(400).json({ message: 'Invalid file type', error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one file' });
    }

    const files = req.files.map(file => ({
      filePath: `/uploads/${file.filename}`,
      fileName: file.filename
    }));

    res.status(200).json({
      success: true,
      files
    });
  });
};
