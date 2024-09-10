const mongoose = require('mongoose');

const MenuCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
});

module.exports = mongoose.model('MenuCategory', MenuCategorySchema);
