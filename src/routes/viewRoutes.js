const express = require("express");
const router = express.Router();
const path = require("path");
const { validateAdminToken, validateToken } = require("../services/JWT");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/index.html"));
});
router.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/cart.html"));
});
router.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/checkout.html"));
});
router.get("/thankyou", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/thankyou.html"));
});
router.get("/trackOrder", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/track-order.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/login.html"));
});
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/signup.html"));
});
router.get("/item/:itemId", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/item.html"));
});
router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/admin-login.html"));
});
router.get("/admin/dashboard", validateAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/dashboard.html"));
});
router.get("/admin/categories", validateAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/categories.html"));
});
router.get(
  "/admin/categories/addUpdateCategories",
  validateAdminToken,
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../public/views/categoriesForm.html")
    );
  }
);
router.get(
  "/admin/categories/addUpdateCategories/:categoryId?",
  validateAdminToken,
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../public/views/categoriesForm.html")
    );
  }
);
router.get("/admin/menuItems", validateAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/menuItems.html"));
});
router.get(
  "/admin/menuItems/addUpdateItems",
  validateAdminToken,
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/menuItemsForm.html"));
  }
);
router.get(
  "/admin/menuItems/addUpdateItems/:menuItemId",
  validateAdminToken,
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/menuItemsForm.html"));
  }
);
router.get("/admin/banners", validateAdminToken,(req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/banners.html"));
});
router.get("/admin/banners/addBanner", validateAdminToken,(req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/addBanner.html"));
});
router.get("/admin/customers", validateAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/customers.html"));
});
router.get("/admin/orders", validateAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/orders.html"));
});
router.get(
  "/admin/orders/viewOrder/:orderId",
  validateAdminToken,
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/viewOrder.html"));
  }
);
router.get("/viewOrders", validateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/customerOrders.html"));
});

module.exports = router;
