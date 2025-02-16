const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid Error,Please upload image"));
  }
};

const limits = {
  limit: 1024 * 1024 * 10,
};

const upload = multer({
  storage,
  filefilter,
  limits,
});

module.exports = upload;
