const multer = require("multer");
const fs = require("fs");

const itemStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "./public/assets/items";
    // Ensure the directory exists before saving the file
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname.replace(" ", "_")}`);
  },
});

const uploadItemImage = multer({ storage: itemStorage });

const bannerStoraga = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "./public/assets/banners";
    // Ensure the directory exists before saving the file
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname.replace(" ", "_")}`);
  },
});

const uploadBannerImage = multer({ storage: bannerStoraga });

module.exports = { uploadItemImage, uploadBannerImage };
