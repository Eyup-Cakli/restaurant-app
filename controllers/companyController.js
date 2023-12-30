const multer = require("multer");
const path = require("path");
const { upload, uploadsDir } = require("../lib/upload.js");
const company = require("../models/concrete/company.js");

// create company
const createCompany_post = async function (req, res) {
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

    const name = req.body.name;
    const retaurantType = req.body.retaurantType;
    let image = "";

    if (req.savedImage && req.savedImage.length > 0) {
      image = path.join(req.savedImage.join(","));
    }

    const newCompany = new company({
      name: name,
      image: image,
      retaurantType: retaurantType,
    });

    const existingCompany = await company.findOne({
      name: name,
    });

    if (!image) {
      return res.status(403).json({ error: "Enter an image." });
    }

    if (existingCompany) {
      return res.status(403).json({ error: "This image already exists." });
    } else {
      const savedCompany = await newCompany.save();
      return res.status(200).json(savedCompany);
    }
  } catch (err) {
    console.error("Caught an error : ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update a company
const updateCompany_put = async (req, res) => {
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

    const companyId = req.params.id;

    const name = req.body.name;
    const restaurantType = req.body.restaurantType;
    let image = "";

    if (req.savedImage && req.savedImage.length > 0) {
      image = path.join(req.savedImage.join(","));
    }

    const existingCompany = await company.findOne({
      _id: companyId,
    });

    const checkNameExists = await company.findOne({
      name: name,
    });

    if (!existingCompany) {
      return res.status(404).json({ error: "Logo not found" });
    }

    if (existingCompany.isDeleted) {
      return res.status(403).json({
        error:
          "You are not authorized to update this logo because it is deleted.",
      });
    }

    if (checkNameExists && !existingCompany.name) {
      return res.status(403).json({
        error: "This image is already in use, please use a different image.",
      });
    }

    if (existingCompany) {
      existingCompany.name = name;
      existingCompany.image = image;
      existingCompany.restaurantType = restaurantType;

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

// delete a company
const deleteCompany_delete = async (req, res) => {
    try {
        const companyId = req.params.id;
        const existingCompany = await company.findOne({
            _id: companyId
        });

        if (!existingCompany) {
            return res.status(404).json({ error: "Company not found." });
        }

        if (existingCompany.isDeleted) {
            return res.status(403).json({ error: "You can not delete this company, because this company already deleted." });
        }

        if (existingCompany) {
            existingCompany.isDeleted = true;
            await existingCompany.save();
            return res.status(200).json({ message: "Company deleted successfully." });
        } else {
            return res.status(403).json({ err });
        }
    } catch (err) {
        console.error("Caught an error: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// QUERIES
//get all company
const getAllCompany_get = async (req, res) => {
    try {
      const companies = await company.find({ isDeleted: false });
      return res.status(200).json(companies);
    } catch (err) {
      console.error("")
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  // get image by id
const getImageById_get = async (req, res) => {
    try {
      const companyId = req.params.id;
      const company = await company.findOne({
        _id : companyId
      });
  
      if (!company) {
        return res.status(404).json({ error: "Logo not found" });
      }
  
      if (company.isDeleted) {
        return res.status(403).json({ error: "Logo not found, because it is deleted " })
      }
  
      if (company) {
        const imagePath = uploadsDir+company.image;
        res.status(200).sendFile(imagePath);
      }
    } catch (err) {
      console.error("Caught an error: ",err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports = { createCompany_post, updateCompany_put, deleteCompany_delete, getAllCompany_get, getImageById_get }