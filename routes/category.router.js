const express = require("express");
const { getCategoryWithPage, getNumberOfCategory,createCategory, getCategories } = require("../controller/category.controller");
const router = express.Router();




router.get("/category/numberOfProductByCategory/:category/", getNumberOfCategory);
router.get("/category/:category/:whichPage", getCategoryWithPage);
router.post("/category/createCategory",createCategory);
router.get("/category/getAllCategories",getCategories);


module.exports = router;