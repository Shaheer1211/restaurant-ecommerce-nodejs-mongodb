const mongoose = require('mongoose');

const bannersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    status: {type: String, default: "active"}
})

module.exports = mongoose.model('banners', bannersSchema);
