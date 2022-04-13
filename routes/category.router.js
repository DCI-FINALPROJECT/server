const express = require("express");
const { getCategoryWithPage, getNumberOfCategory,createCategory } = require("../controller/category.controller");
const router = express.Router();




router.get("/category/numberOfProductByCategory/:category/", getNumberOfCategory);
router.get("/category/:category/:whichPage", getCategoryWithPage);
router.post("/category/createCategory",createCategory);


module.exports = router;