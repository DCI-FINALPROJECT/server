const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {addProduct} = require("../controller/product.controller")



router.post("/addproduct",

//Validation
  body("productName").exists().withMessage("productName can not be empty"),
  body("category").exists().withMessage("category can not be empty"),
  body("brand").exists().withMessage("brand can not be empty"),
  body("price").exists().isFloat().withMessage("price can not be empty or price should be a float"),
  body("description").exists().withMessage("description can not be empty"),
  body("images").exists().withMessage("images can not be empty"),
  body("quantities").exists().withMessage("quantities can not be empty"),
  body("stars").isFloat({ min: 1.0, max: 5.0 }).withMessage("stars should be between 1 und 5"),


addProduct);

module.exports= router;