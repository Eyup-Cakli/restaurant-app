const Router = require("express");
const {
    createCompany_post,
    updateCompany_put,
    deleteCompany_delete,
    getAllCompany_get,
    getImageById_get
} = require("../controllers/companyController.js");

const router = Router();

router.post("/company", createCompany_post);
router.put("/company/:id", updateCompany_put);
router.delete("/company/:id", deleteCompany_delete);
router.get("/company", getAllCompany_get);
router.get("/company/:id", getImageById_get);

module.exports = router;