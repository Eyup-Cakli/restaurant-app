const menu = require("../models/concrete/menu.js");

// create menu
const createMenu_post = async function (req, res) {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res
            .status(400)
            .json({ error: "Multer-induced error output when loading image" });
        } else if (err) {
          return res.status(500).json({ error: "Error loading image", err });
        }
        resolve();
      });
    });

    const restaurantId = req.body.restaurantId;
    const content = req.body.content;
    const price = req.body.price;

    let image = "";

    if (req.savedImage && req.savedImage.length > 0) {
      image = path.join(req.savedImage.join(","));
    }

    const newMenu = new menu({
      restaurantId: restaurantId,
      content: content,
      price: price,
      image: image,
    });
    const savedMenu = await newMenu.save();
    return res.status(200).json(savedMenu);
  } catch (err) {
    console.error("Caught an error : ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update a menu
const updateMenu_put = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res
            .status(400)
            .json({ error: "Multer-induced error output when loading image" });
        } else if (err) {
          return res.status(500).json({ error: "Error loading image" });
        }
        resolve();
      });
    });

    const menuId = req.params.id;

    const restaurantId = req.body.restaurantId;
    const content = req.body.content;
    const price = req.body.price;
    let image = "";

    if (req.savedImage && req.savedImage.length > 0) {
      image = path.join(req.savedImage.join(","));
    }

    const existingMenu = await menu.findOne({
      _id: menuId,
    });

    const checkRestaurantExist = await menu.findOne({
      restaurantId: restaurantId,
    });

    if (!existingMenu) {
      return res.status(404).json({ error: "Logo not found" });
    }

    if (existingMenu.isDeleted) {
      return res.status(403).json({
        error:
          "You are not authorized to update this logo because it is deleted.",
      });
    }

    if (checkRestaurantExist && !existingMenu.restaurantId) {
      return res.status(403).json({
        error: "This image is already in use, please use a different image.",
      });
    }

    if (existingMenu) {
      existingMenu.restaurantId = restaurantId;
      existingMenu.image = image;
      existingMenu.content = content;
      existingMenu.price = price;

      const savedCompany = await existingCompany.save();
      return res.status(200).json(savedCompany);
    } else {
      return res.status(403).json(err);
    }
  } catch (err) {
    console.error("Caught an error : ", err);
    return res.status(200).json({ error: "Internal server error." });
  }
};

// delete a menu
const deleteMenu_delete = async (req, res) => {
    try {
        const menuId = req.params.id;
        const existingMenu = await menu.findOne({
            _id: menuId
        });

        if (!existingMenu) {
            return res.status(404).json({ error: "Menu not found." });
        }

        if (existingMenu.isDeleted) {
            return res.status(403).json({ error: "You can not delete this menu, because this menu already deleted." });
        }

        if (existingMenu) {
            existingMenu.isDeleted = true;
            await existingMenu.save();
            return res.status(200).json({ message: "Menu deleted successfully." });
        } else {
            return res.status(403).json({ err });
        }
    } catch (err) {
        console.error("Caught an error: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// QUERIES
//get all menu
const getAllMenu_get = async (req, res) => {
    try {
      const menues = await menu.find({ isDeleted: false });
      return res.status(200).json(companies);
    } catch (err) {
      console.error("")
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  // get menu by id
const getImageById_get = async (req, res) => {
    try {
      const menuId = req.params.id;
      const menu = await menu.findOne({
        _id : menuId
      });
  
      if (!menu) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      if (menu.isDeleted) {
        return res.status(403).json({ error: "Image not found, because it is deleted " })
      }
  
      if (menu) {
        const imagePath = uploadsDir+menu.image;
        res.status(200).sendFile(imagePath);
      }
    } catch (err) {
      console.error("Caught an error: ",err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports = { createMenu_post, updateMenu_put, deleteMenu_delete, getAllMenu_get, getImageById_get };