const customer = require("../models/customer");
const Order = require("../models/order");
const { decodeToken } = require("../services/JWT");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const { items, totalAmount, address, phoneNo } = req.body;
    const order = new Order({
      customerId,
      items,
      totalAmount,
      address,
      phoneNo,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId items.menuItemId");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "customerId items.menuItemId"
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch orders by customer ID
exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const customerId = decodeToken(req.cookies["AccessToken"]).customerId;
    const orders = await Order.find({ customerId }).populate(
      "items.menuItemId"
    );
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("items.menuItemId");
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }, // Fixed the field name
        },
      },
    ]);

    const customers = await customer.find({}, { name: 1, email: 1 });

    res.json({
      totalOrders,
      totalAmount: totalAmount[0]?.totalAmount || 0, // Default to 0 if no orders
      customers,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

