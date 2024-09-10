const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { validateAdminToken, validateToken } = require("../services/JWT");

// Define customer routes
router.post("/customer/register", customerController.createCustomer);
router.post("/customer/login", customerController.loginCustomer);
router.get("/customer/verifyLogin", customerController.verifyLogin);
router.post("/customer/logout", customerController.userLogout);
router.get("/admin/customerFetch", validateAdminToken, customerController.getAllCustomers);
router.get("/customer/fetch", validateToken, customerController.getCustomerById);
router.post("/customer/createAddress", validateToken, customerController.createAddress);
router.put("/customer/update", validateToken, customerController.updateCustomer);
router.get(
  "/customer/fetchAddresses", validateToken,
  customerController.getAddressesByCustomerId
);
router.put(
  "/customer/updateAddresses/:addressId", validateToken,
  customerController.updateCustomerAddress
);

module.exports = router;
