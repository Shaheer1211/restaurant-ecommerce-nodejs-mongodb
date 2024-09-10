const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateAdminToken } = require('../services/JWT');

// Define order routes
router.post('/order', orderController.createOrder);
router.get('/order', validateAdminToken, orderController.getAllOrders);
router.get('/order/:orderId', validateAdminToken, orderController.getOrderById);
router.put('/order/:orderId', validateAdminToken, orderController.updateOrder);
router.get('/customer/order', orderController.getOrdersByCustomerId);
router.get('/reports', validateAdminToken, orderController.getReports);

module.exports = router;
