const Product = require("../Model/Product.model.js");
const { validationResult } = require("express-validator");
const filterProductsWithProductName = require("../helpers/filterProductsWithProductName.js");


const getAllProducts = async(req,res)=>{

  try{

    const allProducts = await Product.find();

    res.json(allProducts)

  }catch(err){
    res.json({
      status:404,
      message:err
    })
  }
}


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
  console.log("file", req.file, "data", data);
  try {
    if (
      !(
        data.productName &&
        data.category &&
        data.brand &&
        data.price &&
        data.description &&
        data.images &&
        data.capacity &&
        data.stock
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
        sales: data.sales,
        capacity: data.capacity,
        stock: data.stock,
        productNameWithCapacity: data.productName + "-" + data.capacity,
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
    const foundedProducts = await Product.find().limit(20).sort({ _id: -1 });


    const result = await filterProductsWithProductName(foundedProducts); // HELPER USED HERE :) SUPEERRR


    res.json(result);
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
    const foundedProducts = await Product.find().sort({ sales: -1 });

    const result = await filterProductsWithProductName(foundedProducts)

    res.json(result);
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
    const productName = params.productName;


    const similarProducts = await Product.find({
      category: category,
      _id: { $nin: id },
      productName:{$nin:productName}
    }).limit(6);

    const result = await filterProductsWithProductName(similarProducts);


    res.json(result);
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
    const result = (
      await Product.find({ category: req.params.category })
    ).reduce((acc, cur) => {
      if (!acc[cur.brand]) {
        acc[cur.brand] = 1;
      } else {
        acc[cur.brand]++;
      }

      return acc;
    }, {});

    const arr = [Object.keys(result), Object.values(result)];

    const brands = [];

    for (let i = 0; i < Object.keys(result).length; i++) {
      let obj = { [Object.keys(result)[i]]: Object.values(result)[i] };

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

// GET PRODUCT BY CAPACITY

const getProductByCapacity = async (req, res) => {
  try {
    const params = req.params;
    console.log(params);

    const findingElement = await Product.findOne({
      productName: params.productName,
      capacity: params.capacity,
    });

    res.status(200).json({id:findingElement._id.toString()});
  } catch (err) {
    res.status(404).json({
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
  getBestSellers,
  getProductByCapacity,
  getAllProducts
};
