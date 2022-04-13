const Product = require("../Model/Product.model.js");
const { validationResult } = require("express-validator");

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const findedProduct = await Product.findById({ _id: id });

    res.json(findedProduct);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

const getFiveNewestProduct = async (req, res) => {
  try {
    const newestFive = await Product.find().sort({ timestamp: -1 }).limit(5);

    res.json(newestFive);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

const addProduct = async (req, res) => {
  const data = req.body;
  const file = req.file;
  console.log( 'file', req.file, "data", data);
  try {
    if (
      !(
        data.productName &&
        data.category &&
        data.brand &&
        data.price &&
        data.description &&
        data.images&&
        ["data.64GB"]&&
        ["data.128GB"]&&
        ["data.256GB"]&&
        ["data.512GB"]
      )
    ) {
      return res.status(401).send("missing information");
    }

    const errors = validationResult(req);
    const isValid = errors.isEmpty();

    if (isValid) {
      const product = new Product({
        productName: data.productName,
        category: data.category,
        brand: data.brand,
        price: data.price,
        description: data.description,
        images: data.images,
        reviews: data.reviews,
        stars: data.stars,
        timestamp: new Date().toISOString(),
        sales:data.sales,
        ["64 GB"]:data["64 GB"],
        ["128 GB"]:data["128 GB"],
        ["256 GB"]:data["256 GB"],
        ["512 GB"]:data["512 GB"]

      });

      await product.save();
      return res.status(200).send(product);
    } else {
      res.status(406).json({
        message: "invalid input",
        errors: errors.array(),
      });
    }
  } catch (err) {
    res.send(err);
  }
};

// GET LATEST PRODUCTS !

const getLatestProducts = async (req, res) => {
  try {
    const findedProducts = await Product.find().sort({_id:-1});

    res.json(findedProducts);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

// GET BEST SELLER PRODUCTS !

const getBestSellers = async (req, res) => {
  try {
    const findedProducts = await Product.find().sort({sales:-1});

    res.json(findedProducts);
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

// GET SIMILAR PRODUCTS

const getSimilarProducts = async (req, res) => {
  try {
    const params = req.params;
    const category = params.category;
    const id = params.id;


    const similarProducts = await Product.find({
      category: category,
      _id: { $nin: id },
    }).limit(6);

    console.log(similarProducts);

    res.json(similarProducts);
  } catch (err) {
    res.json({
      status: 404,
      message: "Error",
    });
  }
};

// GET BRANDS FROM DATABASE

const getBrandsFromDataBase = async (req, res) => {
  try {


   const result = (await Product.find({category:req.params.category})).reduce((acc,cur) => {
      if (!acc[cur.brand]){
        acc[cur.brand] =1
      }else{
        acc[cur.brand]++;
      }

      return acc;
    },{});  
    
    console.log(result);

    const arr = [Object.keys(result),Object.values(result)];

    const brands = [];

    for(let i=0;i<Object.keys(result).length;i++){

      let obj = {[Object.keys(result)[i]]:Object.values(result)[i]}

      brands.push(obj);

    }

    res.json(brands);
  } catch (err) {
    res.json({
      status: 404,
      message: err,
    });
  }
};

module.exports = {
  addProduct,
  getProductById,
  getLatestProducts,
  getFiveNewestProduct,
  getSimilarProducts,
  getBrandsFromDataBase,
  getBestSellers
};
