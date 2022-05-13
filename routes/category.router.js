const express = require("express");
const {
  getCategoryWithPage,
  getNumberOfCategory,
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controller/category.controller");
const router = express.Router();

router.get(
  "/category/numberOfProductByCategory/:category/",
  getNumberOfCategory
);
router.get("/category/:category/:whichPage", getCategoryWithPage);
router.post("/category/createCategory", createCategory);
router.get("/category/getAllCategories", getCategories);
router.post("/category/delete/:categoryId",deleteCategory);

module.exports = router;
