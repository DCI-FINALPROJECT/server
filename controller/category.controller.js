const Product = require("../Model/Product.model");

//-----> GET NUMBER OF PRODUCTS BY CATEGORY

const getNumberOfCategory = async (req, res) => {

    // "/category/numberOfProductByCategory/:category"  related api for this controller

  
    try {

  
      const result = await Product.find({ category: req.params.category })

    
      res.json(result.length);
    } catch (err) {
      res.status(404).json({
        status: "404",
        message: err,
      });
    }
  };

//------> GET PRODUCTS BY CATEGORY WITH PAGE

const getCategoryWithPage = async (req, res) => {
  // "/category/:category/:whichPage"  related api for this controller

  try {
    const page = req.params.whichPage;
    const choise = req.query.choise;

    let criterion = {};

    if(choise === "1"){
      criterion = {_id:-1}  // This is for new products
    }else if(choise === "2"){
      
      criterion = {sales:-1}  // This is for sales
    }else if(choise === "3"){
      
      criterion = {price:1}  // This is for price
    }

    console.log(choise);

    const result = await Product.find({ category: req.params.category })
      .sort(criterion)
      .limit(4)
      .skip((page - 1) * 4);

    res.json(result);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};





module.exports = { getCategoryWithPage,getNumberOfCategory };
