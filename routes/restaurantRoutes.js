const Router = require("express");
const {
  createRestaurant_post,
  updateRestaurant_put,
  deleteRestaurant_delete,
  getAllRestaurant_get,
  getRestaurantById_get,
} = require("../controllers/restaurantController.js");

const router = Router();

router.post("/restaurant", createRestaurant_post);
router.put("/restaurant/:id", updateRestaurant_put);
router.delete("/restaurant/:id", deleteRestaurant_delete);
router.get("/restaurant", getAllRestaurant_get);
router.get("/restaurant/:id", getRestaurantById_get);

module.exports = router;
