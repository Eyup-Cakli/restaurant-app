const Router = require("express");
const {
    createOrder_post,
    updateOrder_put,
    deleteOrder_delete,
    getAllOrder_get,
    getOrderById_get,
} = require("../controllers/orderController");

const router = Router();

router.post("/order", createOrder_post);
router.put("/order/:id", updateOrder_put);
router.delete("/order/:id", deleteOrder_delete);
router.get("/order", getAllOrder_get);
router.get("/order/:id", getOrderById_get);

module.exports = router;