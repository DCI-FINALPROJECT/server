const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProductById,
  getFiveNewestProduct,
  getSimilarProducts,
  getBrandsFromDataBase,
  getLatestProducts,
  getBestSellers,
  getProductByCapacity,
  getAllProducts,
  deleteProduct,
  updateProduct,
  deneme,
  updateProductStock,
} = require("../controller/product.controller");
const { body } = require("express-validator");
const auth = require("../Middleware/auth.jwt.middleware");
const Product = require("../Model/Product.model");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });

// POST add new product
router.post(
  "/admin/addproduct",

  //Validation
  body("productName").exists().withMessage("productName can not be empty"),
  body("category").exists().withMessage("category can not be empty"),
  body("brand").exists().withMessage("brand can not be empty"),
  body("price")
    .exists()
    .isFloat()
    .withMessage("price can not be empty or price should be a float"),
  body("description").exists().withMessage("description can not be empty"),
  body("images").exists().withMessage("images can not be empty"),
  body("capacity").exists().withMessage("capacity must be written"),
  //body("stars").isFloat({ min: 1.0, max: 5.0 }).withMessage("stars should be between 1 und 5"),

  addProduct
);
// DELETE Product
router.delete("/admin/deleteproduct/:id", auth, deleteProduct);

// UPDATE Product
router.put("/admin/updateproduct/:id", updateProduct);

// GET listing newest 5 products
router.get("/product/newestfive", getFiveNewestProduct);

// GET listing all products !!!! WE WILL CHANGE THIS API, LATER
router.get("/products/all", getAllProducts);

router.get("/products/newProducts", getLatestProducts);

router.get("/products/bestSellers", getBestSellers);

// GET listing products with products' id
router.get("/product/:id", getProductById);

// GET Similar Products
router.get("/product/similar/:category/:id/:productName", getSimilarProducts);

// GET Brands (We use this for filter Brands)
router.get("/product/brands/filter/:category", getBrandsFromDataBase);

// GET PRODUCT BY CAPACITY
router.get("/product/capacity/:productName/:capacity", getProductByCapacity);

// UPDATE PRODUCT STOCK

router.patch("/product/stock",updateProductStock);

module.exports = router;
