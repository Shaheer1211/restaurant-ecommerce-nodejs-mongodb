const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { validateAdminToken } = require("../services/JWT");

// Define admin routes
router.post("/admin/register", adminController.createAdmin);
router.post("/admin/login", adminController.loginAdmin);
router.get("/admin/verifyLogin", adminController.verifyLogin);
router.post("/admin/logout", adminController.userLogout);
router.get("/admin/fetch", validateAdminToken, adminController.getAllAdmins);
router.put("/admin/update", validateAdminToken, adminController.updateAdmin);

module.exports = router;
