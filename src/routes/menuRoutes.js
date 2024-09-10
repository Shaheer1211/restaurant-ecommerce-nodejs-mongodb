const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { validateAdminToken } = require('../services/JWT');
const { uploadItemImage } = require('../services/multer');

// Define menu routes
router.post('/category', validateAdminToken, menuController.createCategory);
router.get('/category', menuController.getAllCategories);
router.get('/category/:categoryId', menuController.getCategoryById);
router.put('/category/:categoryId', validateAdminToken, menuController.updateCategory);
router.delete('/category/:categoryId', validateAdminToken, menuController.deleteCategory);
router.post('/menuItem', validateAdminToken, uploadItemImage.single("image"), menuController.createMenuItem);
router.get('/menuItem', menuController.getAllMenuItems);
router.get('/menuItem/:menuItemId', menuController.getMenuItemById);
router.delete('/menuItem/:menuItemId', menuController.deleteMenuItem);
router.put('/menuItem/:menuItemId', validateAdminToken, menuController.updateMenuItem);

module.exports = router;
