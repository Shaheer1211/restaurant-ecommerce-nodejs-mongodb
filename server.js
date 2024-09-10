const express = require("express");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");

// Import routes
const adminRoutes = require("./src/routes/adminRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const menuRoutes = require("./src/routes/menuRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const bannerRoutes = require("./src/routes/bannerRoutes");
const viewRoutes = require("./src/routes/viewRoutes");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Define Routes
app.use("/api", adminRoutes);
app.use("/api", customerRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);
app.use("/api", bannerRoutes);
app.use(viewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
