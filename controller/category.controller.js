const Product = require("../Model/Product.model");

// GET NUMBER OF PRODUCTS BY CATEGORY

const getNumberOfCategory = async (req, res) => {

    // "/category/numberOfProductByCategory/:category"  related api for this controller

  
    try {

  
      const result = await Product.find({ category: req.params.category })

      console.log(result);
    
      res.json(result.length);
    } catch (err) {
      res.status(404).json({
        status: "404",
        message: err,
      });
    }
  };

// GET PRODUCTS BY CATEGORY WITH PAGE

const getCategoryWithPage = async (req, res) => {
  // "/category/:category/:whichPage"  related api for this controller

  try {
    const page = req.params.whichPage;

    const result = await Product.find({ category: req.params.category })
      .limit(2)
      .skip((page - 1) * 2);

    res.json(result);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};





module.exports = { getCategoryWithPage,getNumberOfCategory };
