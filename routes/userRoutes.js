const Router = require("express");
const {
  updateUser_put,
  deleteUser_delete,
  getAllUsers_get,
  getUserById_get,
} = require("../controllers/userController.js");
const { requireAuth } = require("../middlewares/authMiddleware.js");

const router = Router();

router.use(requireAuth);
router.put("/user/:id", updateUser_put);
router.delete("/user/:id", deleteUser_delete);

router.get("/users", getAllUsers_get);
router.get("/user/:id", getUserById_get);

module.exports = router;
