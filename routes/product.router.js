const express = require("express");
const router = express.Router();
const {addProduct, getProductById} = require("../controller/product.controller")

// GET listing products with products' id

router.get("/product/:id", getProductById);



// POST add new product
router.post("/addproduct", addProduct);

module.exports= router;