const user = require("../models/concrete/user.js");

// COMMANDS
// update operation
const updateUser_put = async (req, res) => {
  try {
    const userIdToBeUpdated = req.params.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newUsername = req.body.username;

    const existingUser = await user.findById(userIdToBeUpdated);
    const checkUserEmailExist = await user.find({ email: newEmail });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (existingUser.isDeleted) {
      return res.status(403).json({
        error:
          "You are not authorized to update this user, because it is deleted.",
      });
    }

    if (checkUserEmailExist && !existingUser.email) {
      res.status(403).json({
        error:
          "this email is already in use, please use a different email address.",
      });
    }

    existingUser.email = newEmail;
    existingUser.password = newPassword;
    existingUser.username = newUsername;

    try {
      const savedUser = await existingUser.save();
      return res.status(200).json(savedUser);
    } catch (err) {
      if (err.code === 11000 && err.keyValue && err.keyValue.email) {
        return res
          .status(400)
          .json({ error: "This email is already registered." });
      } else {
        return res
          .status(500)
          .json({ error: "An error occurred while creating the user." });
      }
    }
  } catch (err) {
    console.error("Caught an error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete operation
const deleteUser_delete = async (req, res) => {
  try {
    const userIdToBeDeleted = req.params.id;
    const existingUser = await user.findById(userIdToBeDeleted);

    if (!existingUser) {
      return res.status(403).json({ error: "User not found." });
    }

    if (existingUser.isDeleted) {
      return res.status(403).json({ error: "User already deleted." });
    }

    if (existingUser) {
      existingUser.isDeleted = true;
      await existingUser.save();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(403).json({ err });
    }
  } catch (err) {
    console.error("Caught an error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// QUERIES
// get all users
const getAllUsers_get = async (req, res) => {
  try {
    const users = await user.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (err) {
    console.error("Caught an error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get user by id
const getUserById_get = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await user.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.isDeleted) {
      return res.status(404).json({ error: "User deleted." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Caught an error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updateUser_put, deleteUser_delete, getAllUsers_get, getUserById_get };
