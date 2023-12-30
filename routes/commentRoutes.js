const Router = require("express");
const {
    createComment_post,
    updateComment_put,
    deleteComment_delete,
    getAllComment_get,
    getCommentById_get,
} = require("../controllers/commentController");

const router = Router();

router.post("/comment", createComment_post);
router.put("/comment/:id", updateComment_put);
router.delete("/comment/:id", deleteComment_delete);
router.get("/comment", getAllComment_get);
router.get("/comment/:id", getCommentById_get);

module.exports = router;