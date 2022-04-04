const express = require("express");
const router = express.Router();
const {addProduct, getProductById, getAllProducts} = require("../controller/product.controller")

// GET listing products with products' id

router.get("/product/:id", getProductById);


// GET listing all products !!!! WE WILL CHANGE THIS API, LATER

router.get("/products/all", getAllProducts);





// POST add new product
router.post("/addproduct", addProduct);

module.exports= router;