const express = require("express");
const router = express.Router();
const {addProduct} = require("../controller/product.controller")

router.post("/addproduct", addProduct);

module.exports= router;