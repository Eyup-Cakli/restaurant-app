const Router = require("express");
const {
  createAddress_post,
  updateAddress_put,
  deleteAddress_delete,
  getAllAddress_get,
  getAddressId_get,
} = require("../controllers/addressController.js");

const router = Router();

router.post("/address", createAddress_post);
router.put("/address/:id", updateAddress_put);
router.delete("/address/:id", deleteAddress_delete);
router.get("/address", getAllAddress_get);
router.get("/address/:id", getAddressId_get);

module.exports = router;