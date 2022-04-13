const express = require("express");
const router = express.Router();
const {addProduct, getProductById, getFiveNewestProduct, getSimilarProducts, getBrandsFromDataBase, getLatestProducts, getBestSellers} = require("../controller/product.controller")
const { body } = require("express-validator");
const auth = require("../Middleware/auth.jwt.middleware");
const Product = require("../Model/Product.model");
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
console.log('upload',upload);

// POST add new product
router.post("/addproduct",



//Validation
  body("productName").exists().withMessage("productName can not be empty"),
  body("category").exists().withMessage("category can not be empty"),
  body("brand").exists().withMessage("brand can not be empty"),
  body("price").exists().isFloat().withMessage("price can not be empty or price should be a float"),
  body("description").exists().withMessage("description can not be empty"),
  body("images").exists().withMessage("images can not be empty"),
  body("quantities").exists().withMessage("quantities can not be empty"),
  //body("stars").isFloat({ min: 1.0, max: 5.0 }).withMessage("stars should be between 1 und 5"),

  //Multer
upload.single('images'), 

addProduct);

// GET listing newest 5 products
router.get("/product/newestfive", getFiveNewestProduct);


// GET listing all products !!!! WE WILL CHANGE THIS API, LATER

router.get("/products/all", getLatestProducts);


router.get("/products/bestSellers", getBestSellers);



// GET listing products with products' id
router.get("/product/:id", getProductById);

// GET Similar Products

router.get("/product/similar/:category/:id",getSimilarProducts);


// GET Brands (We use this for filter Brands)

router.get("/product/brands/filter",getBrandsFromDataBase);




module.exports= router;