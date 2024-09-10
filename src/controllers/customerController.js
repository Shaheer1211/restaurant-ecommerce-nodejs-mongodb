const Customer = require("../models/customer");
const CustomerAddress = require("../models/customerAddress");
const bcrypt = require("bcryptjs");
const { createToken, decodeToken } = require("../services/JWT");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, password: hashedPassword });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Customer login
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = createToken({ customerId: customer._id, type: "customer" });
    res.cookie("AccessToken", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyLogin = async (req, res) => {
  const accessToken = req.cookies["AccessToken"];
  if (accessToken) return res.status(200).json({ message: "LoggedIn" });
  return res.status(500).json({ message: "LoggedOut" });
};

exports.userLogout = (req, res) => {
  res.clearCookie("AccessToken");
  return res.status(200).json({ Message: "Logout successful" });
};

// Fetch all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("addresses");
    res.json(customers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const customer = await Customer.findById(customerId).populate("addresses");
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const { name, email, password } = req.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, email, password: hashedPassword },
      { new: true }
    ).populate("addresses");
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const { addressLine, city, postalCode, country } = req.body;
    const address = new CustomerAddress({
      customerId,
      addressLine,
      city,
      postalCode,
      country,
    });
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch addresses by customer ID
exports.getAddressesByCustomerId = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const addresses = await CustomerAddress.find({ customerId });
    res.json(addresses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a customer address
exports.updateCustomerAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { addressLine, city, postalCode, country } = req.body;
    const updatedAddress = await CustomerAddress.findByIdAndUpdate(
      addressId,
      { addressLine, city, postalCode, country },
      { new: true }
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
