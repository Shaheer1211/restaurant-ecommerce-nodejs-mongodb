const express = require("express");
const router = express.Router();
const bannersController = require("../controllers/bannersController");
const { validateAdminToken } = require("../services/JWT");
const { uploadBannerImage } = require("../services/multer");

router.post("/banner", validateAdminToken, uploadBannerImage.single("image"), bannersController.createBanner);
router.get("/banner", bannersController.getAllBanners);
router.put("/banners/:id", validateAdminToken, bannersController.statusUpdate); // Status update route
router.delete("/banners/:id", validateAdminToken, bannersController.deleteBanner);      // Delete route

module.exports = router;
