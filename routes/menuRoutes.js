const Router = require("express");
const {
    createMenu_post,
    updateMenu_put,
    deleteMenu_delete,
    getAllMenu_get,
    getImageById_get
} = require("../controllers/menuController");

const router = Router();

router.post("/menu", createMenu_post);
router.put("/menu/:id", updateMenu_put);
router.delete("/menu/:id", deleteMenu_delete);
router.get("/menu", getAllMenu_get);
router.get("/menu/:id", getImageById_get);

module.exports = router;