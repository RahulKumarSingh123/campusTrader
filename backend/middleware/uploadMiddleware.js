const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + Math.random() * 1e3 + path.extname(file.originalname),
    );
  },
});

module.exports = multer({ storage: storage });
