const filterProductsWithProductName = require("../helpers/filterProductsWithProductName");
const Product = require("../Model/Product.model");


const adminpopulerproducts = async (req, res) => {
    try {
      const foundedProducts = await Product.find().sort({ sales: -1 }).limit(10);
  
      const result = await filterProductsWithProductName(foundedProducts);
  
      res.json(result);
    } catch (err) {
      res.status(404).json({
        status: "404",
        message: err,
      });
    }
  };

  module.exports = {adminpopulerproducts};