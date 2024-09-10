const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const { createToken, decodeToken } = require("../services/JWT");

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = createToken({ adminId: admin._id, type: "admin" });
    res.cookie("AdminToken", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    res.json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyLogin = async (req, res) => {
  const accessToken = req.cookies["AdminToken"];
  if (accessToken) return res.status(200).json({ message: "LoggedIn" });
  return res.status(500).json({ message: "LoggedOut" });
};

exports.userLogout = (req, res) => {
  res.clearCookie("AdminToken");
  return res.status(200).json({ Message: "Logout successful" });
};

// Fetch all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = decodeToken(req.cookies["AdminToken"]).adminId
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { username, password: hashedPassword },
      { new: true }
    );
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
