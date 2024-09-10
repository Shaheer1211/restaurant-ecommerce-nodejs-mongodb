const mongoose = require('mongoose');

const CustomerAddressSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

module.exports = mongoose.model('CustomerAddress', CustomerAddressSchema);
