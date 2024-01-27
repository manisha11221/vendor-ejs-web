// multerMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const publicDirectory = path.join(__dirname, '..', 'public');
const uploadDirectory = path.join(publicDirectory, 'uploads');

// Create the 'uploads' directory inside the 'public' folder if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
