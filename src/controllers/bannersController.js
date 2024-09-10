const Banners = require("../models/banners");

// Update a banner
exports.createBanner = async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
      image = image.replaceAll("\\", "/");
      image = image.replace("public", "");
    }
    const banner = new Banners({ name, image });

    await banner.save();

    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all banners with optional status query
exports.getAllBanners = async (req, res) => {
    try {
      const query = {};
      
      // Check if a status query is provided and add to the query object
      if (req.query.status) {
        query.status = req.query.status;  // Ensure the status value matches the database exactly
      }
  
      // Find banners with the query
      let banners = await Banners.find(query)
  
      // Update image URL formatting
      banners = banners.map((item) => ({
        ...item._doc,
        image: item.image && req.protocol + "://" + req.get("host") + item.image,
      }));
  
      res.json(banners);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

// Update banner status
exports.statusUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the banner by ID and update its status
    const banner = await Banners.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({banner, success: true});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the banner by ID and delete it
    const banner = await Banners.findByIdAndDelete(id);

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

