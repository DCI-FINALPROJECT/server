const express = require("express");
const { getCategoryWithPage, getNumberOfCategory } = require("../controller/category.controller");
const router = express.Router();




router.get("/category/numberOfProductByCategory/:category/", getNumberOfCategory);
router.get("/category/:category/:whichPage", getCategoryWithPage);


module.exports = router;