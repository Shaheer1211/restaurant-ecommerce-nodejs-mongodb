const MenuCategory = require("../models/menuCategory");
const MenuItem = require("../models/menuItem");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new MenuCategory({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch category by id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await MenuCategory.findById(req.params.categoryId);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const updatedCategory = await MenuCategory.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Check if the category exists before deleting
    const category = await MenuCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category
    await MenuCategory.findByIdAndDelete(categoryId);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Error deleting category" });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
      image = image.replaceAll("\\", "/");
      image = image.replace("public", "");
    }
    const menuItem = new MenuItem({
      name,
      price,
      image,
      description,
      categoryId,
    });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    let menuItems = await MenuItem.find().populate("categoryId");
    menuItems = menuItems.map((item) => ({
      ...item._doc,
      image: item.image && req.protocol + "://" + req.get("host") + item.image,
    }));
    res.json(menuItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch category by id
exports.getMenuItemById = async (req, res) => {
  try {
    let menuItem = await MenuItem.findById(req.params.menuItemId);
    menuItem = {
      ...menuItem._doc,
      image:
        menuItem.image &&
        req.protocol + "://" + req.get("host") + menuItem.image,
    };
    res.json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const { name, price, description, categoryId } = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      { name, price, description, categoryId },
      { new: true }
    );
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a menuItem
exports.deleteMenuItem = async (req, res) => {
  const { menuItemId } = req.params;

  try {
    // Check if the category exists before deleting
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    // Delete the category
    await MenuItem.findByIdAndDelete(menuItemId);
    console.log(menuItem)
    return res.status(200).json({ message: "Menu Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Menu Item:", error);
    return res.status(500).json({ message: "Error deleting Menu Item" });
  }
};