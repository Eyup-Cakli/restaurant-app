const restaurant = require("../models/concrete/restaurant.js");

//COMMANDS
// add a new restaurant
const createRestaurant_post = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const about = req.body.about;
    const addressId = req.body.addressId;

    const newRestaurant = new restaurant({
      companyId: companyId,
      about: about,
      addressId: addressId,
    });

    if (!companyId || !about || !addressId) {
      return res.status(403).json({ error: "All fields must be filled." });
    } else {
      const savedRestaurant = await newRestaurant.save();
      return res.status(200).json(savedRestaurant);
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update a restaurant
const updateRestaurant_put = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const newCompanyId = req.body.companyId;
    const newAbout = req.body.about;
    const newAddressId = req.body.addressId;

    if (!newCompanyId || !newAbout || !newAddressId) {
      return res.status(403).json({ error: "All fields must be filled." });
    }

    const existingRestaurant = await restaurant.findOne({
      _id: restaurantId,
    });

    if (!existingRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    } else {
      existingRestaurant.companyId = newCompanyId;
      existingRestaurant.about = newAbout;
      existingRestaurant.addressId = newAddressId;

      const savedRestaurant = await existingRestaurant.save();
      return res.status(200).json(savedRestaurant);
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete a restaurant
const deleteRestaurant_delete = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const existingRestaurant = await restaurant.findOne({
      _id: restaurantId,
    });

    if (!existingRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    if (existingRestaurant.isDeleted) {
      return res
        .status(403)
        .json({ error: "This restaurant already deleted." });
    }

    if (existingRestaurant) {
      existingRestaurant.isDeleted = true;
      await existingRestaurant.save();
      return res
        .status(200)
        .json({ message: "Restaurant deleted successfully." });
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// QUERIES
// get all restaurants
const getAllRestaurant_get = async (req, res) => {
  try {
    const restaurants = await restaurant.find({
      isDeleted: false,
    });
    return res.status(200).json(restaurants);
  } catch (err) {
    console.err("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// get restaurant by id
const getRestaurantById_get = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurant.findOne({
      _id: restaurantId,
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (restaurant.isDeleted) {
      return res.status(403).json({ error: "Restaurant is deleted" });
    } else {
      return res.status(200).json(restaurant);
    }
  } catch (err) {
    console.err("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createRestaurant_post,
  updateRestaurant_put,
  deleteRestaurant_delete,
  getAllRestaurant_get,
  getRestaurantById_get,
};
