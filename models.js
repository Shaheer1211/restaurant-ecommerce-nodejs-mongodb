//const express = require("express");
//const app = express();
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/RMS";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const customerSchema = new mongoose.Schema({
  customerID: { type: Number, required: true, unique: true }, // Correct type is Number (with capital N)
  loginID: { type: String, required: true, unique: true }, // Correct type is String (with capital S)
  password: { type: String, required: true }, // Correct type is String (with capital S)
  name: { type: String }, // Correct type is String (with capital S)
  phone: { type: String }, // Correct type is String (with capital S)
  address: { type: String }, // Correct type is String (with capital S)
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
const adminSchema = new mongoose.Schema({
  loginID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

const itemsSchema = new mongoose.Schema({
  itemID: { type: Number, required: true, unique: true },
  item: { type: String },
  category: { type: String },
  price: { type: Number },
  discount: { type: Number },
});

const FoodItems = mongoose.model("FoodItems", itemsSchema);

module.exports = FoodItems;

const orderSchema = new mongoose.Schema({
  orderID: { type: Number, required: true, unique: true },
  customerID: { type: Number, required: true },
  name: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;

const trackOrderSchema = new mongoose.Schema({
  orderID: { type: Number, required: true, unique: true },
  status: { type: String, required: true },
});
const TrackOrder = mongoose.model("TrackOrder", trackOrderSchema);
module.exports = TrackOrder;
