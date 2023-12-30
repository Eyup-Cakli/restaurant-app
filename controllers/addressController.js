const address = require("../models/concrete/address.js");

//COMMANDS
// add a new address
const createAddress_post = async (req, res) => {
  try {
    const city = req.body.city;
    const county = req.body.county;
    const plainAddress = req.body.plainAddress;

    const newAddress = new address({
      city: city,
      county: county,
      plainAddress: plainAddress,
    });

    if (!city || !county || !plainAddress) {
      return res.status(403).json({ error: "Fields cannot be empty." });
    } else {
      const savedAddress = await newAddress.save();
      return res.status(200).json(savedAddress);
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update address
const updateAddress_put = async (req, res) => {
  try {
    const addressId = req.params.id;
    const newCity = req.body.city;
    const newCounty = req.body.county;
    const newPlainAddress = req.body.plainAddress;

    const existingAddress = await address.findOne({
      _id: addressId,
    });

    if (!newCity || !newCounty || !newPlainAddress) {
      return res.status(403).json({ error: "Fields cannot be empty." });
    }

    if (existingAddress) {
      existingAddress.city = newCity;
      existingAddress.county = newCounty;
      existingAddress.plainAddress = newPlainAddress;

      const savedAddress = await existingAddress.save();
      return res.status(200).json({ savedAddress });
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// delete address
const deleteAddress_delete = async (req, res) => {
  try {
    const addressId = req.params.id;
    const existingAddress = await address.findOne({
      _id: addressId,
    });

    if (!existingAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    if (existingAddress.isDeleted) {
      return res.status(403).json({ error: "This address already deleted." });
    }

    if (existingAddress) {
      existingAddress.isDeleted = true;
      await existingAddress.save();
      return res.status(200).json({ message: "Address deleted successfully" });
    }
  } catch (err) {
    console.error("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// QUERIES
// get all boat hull metarials
const getAllAddress_get = async (req, res) => {
  try {
    const addresses = await address.find({
      isDeleted: false,
    });
    return res.status(200).json(addresses);
  } catch (err) {
    console.err("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// get hull metarials by id
const getAddressId_get = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await address.findOne({
      _id: addressId,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    if (address.isDeleted) {
      return res.status(403).json({ error: "Address deleted" });
    } else {
      return res.status(200).json(address);
    }
  } catch (err) {
    console.err("Caught an error: ", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createAddress_post,
  updateAddress_put,
  deleteAddress_delete,
  getAllAddress_get,
  getAddressId_get,
};
