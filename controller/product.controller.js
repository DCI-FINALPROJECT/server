const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const Product = require("../Model/Product.model.js");
const { validationResult } = require("express-validator");
const filterProductsWithProductName = require("../helpers/filterProductsWithProductName.js");

// default options
app.use(fileUpload());

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.json(allProducts);
  } catch (err) {
    res.json({
      status: 404,
      message: err,
    });
  }
};

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

//UPDATE Product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const tarih = new Date();
  const rastgeleSayi = tarih.getTime();

  console.log("req.body", req.files);

  if (req.files !== null) {
    var dosya1isim = rastgeleSayi + "-" + data.productName + "-1.jpg";
    var dosya2isim = rastgeleSayi + "-" + data.productName + "-2.jpg";
    var dosya3isim = rastgeleSayi + "-" + data.productName + "-3.jpg";
    var dosya4isim = rastgeleSayi + "-" + data.productName + "-4.jpg";

    req.files.dosya1 &&
      (await req.files.dosya1.mv(
        `${__dirname}/../public/images/${dosya1isim}`
      ));
    req.files.dosya2 &&
      (await req.files.dosya2.mv(
        `${__dirname}/../public/images/${dosya2isim}`
      ));
    req.files.dosya3 &&
      (await req.files.dosya3.mv(
        `${__dirname}/../public/images/${dosya3isim}`
      ));
    req.files.dosya4 &&
      (await req.files.dosya4.mv(
        `${__dirname}/../public/images/${dosya4isim}`
      ));
  }

  // http://localhost:5000/images/1652428573784-Samsung s9 Plus-1.jpg

  console.log("data:", req.files);

  let selectedImages = "";

  req.files === null
    ? (selectedImages = [
        data.dosya1,
        data.dosya2,
        data.dosya3,
        data.dosya4,
      ])
    : (selectedImages = [
        "http://localhost:5000/images/" + dosya1isim,
        "http://localhost:5000/images/" + dosya2isim,
        "http://localhost:5000/images/" + dosya3isim,
        "http://localhost:5000/images/" + dosya4isim,
      ]);

  const product = {
    productName: req.body.productName.toUpperCase(),
    productNameWithCapacity:
      req.body.productName + "-" + req.body.capacity.toUpperCase(),
    category: req.body.category,
    images: selectedImages,

    stock: {
      Black: req.body.Black,
      Red: req.body.Red,
      Green: req.body.Green,
      Blue: req.body.Blue,
    },
    brand: req.body.brand.toUpperCase(),
    description: req.body.description,
    price: req.body.price,
    sales: 0,
    capacity: req.body.capacity.toUpperCase(),
  };

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      product
    );

    res
      .status(200)
      .json({ message: "product is updated", product: updatedProduct });
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

//DELETE Product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "product is deleted", product: deletedProduct });
  } catch (err) {
    res.status(404).json({
      status: "404",
      message: err,
    });
  }
};

const addProduct = async (req, res) => {
  const tarih = new Date();
  const rastgeleSayi = tarih.getTime();

  if (!req.files) {
    return console.log("Resim Eklenmeli");
  }

  const dosya1isim = rastgeleSayi + "-" + req.body.productName + "-1.jpg";
  const dosya2isim = rastgeleSayi + "-" + req.body.productName + "-2.jpg";
  const dosya3isim = rastgeleSayi + "-" + req.body.productName + "-3.jpg";
  const dosya4isim = rastgeleSayi + "-" + req.body.productName + "-4.jpg";

  await req.files.dosya1.mv(`${__dirname}/../public/images/${dosya1isim}`);
  await req.files.dosya2.mv(`${__dirname}/../public/images/${dosya2isim}`);
  await req.files.dosya3.mv(`${__dirname}/../public/images/${dosya3isim}`);
  await req.files.dosya4.mv(`${__dirname}/../public/images/${dosya4isim}`);

  const urun = new Product({
    productName: req.body.productName.toUpperCase(),
    capacity: "64 GB",
    productNameWithCapacity:
      req.body.productName + "-" + req.body.capacity.toUpperCase(),
    category: req.body.category,
    images: [
      "http://localhost:5000/images/" + dosya1isim,
      "http://localhost:5000/images/" + dosya2isim,
      "http://localhost:5000/images/" + dosya3isim,
      "http://localhost:5000/images/" + dosya4isim,
    ],
    stock: {
      Black: req.body.Black,
      Red: req.body.Red,
      Green: req.body.Green,
      Blue: req.body.Blue,
    },
    brand: req.body.brand.toUpperCase(),
    description: req.body.description,
    price: req.body.price,
    sales: 0
  });

  const urun2 = new Product({
    productName: req.body.productName.toUpperCase(),
    capacity: "128 GB",
    productNameWithCapacity:
      req.body.productName + "-" + "128 GB",
    category: req.body.category,
    images: [
      "http://localhost:5000/images/" + dosya1isim,
      "http://localhost:5000/images/" + dosya2isim,
      "http://localhost:5000/images/" + dosya3isim,
      "http://localhost:5000/images/" + dosya4isim,
    ],
    stock: {
      Black: 0,
      Red: 0,
      Green: 0,
      Blue: 0,
    },
    brand: req.body.brand.toUpperCase(),
    description: req.body.description,
    price: req.body.price,
    sales: 0
  });

  const urun3 = new Product({
    productName: req.body.productName.toUpperCase(),
    capacity: "256 GB",
    productNameWithCapacity:
      req.body.productName + "-" + "256 GB",
    category: req.body.category,
    images: [
      "http://localhost:5000/images/" + dosya1isim,
      "http://localhost:5000/images/" + dosya2isim,
      "http://localhost:5000/images/" + dosya3isim,
      "http://localhost:5000/images/" + dosya4isim,
    ],
    stock: {
      Black: 0,
      Red: 0,
      Green: 0,
      Blue: 0,
    },
    brand: req.body.brand.toUpperCase(),
    description: req.body.description,
    price: req.body.price,
    sales: 0
  });

  const urun4 = new Product({
    productName: req.body.productName.toUpperCase(),
    capacity: "512 GB",
    productNameWithCapacity:
      req.body.productName + "-" + "512 GB",
    category: req.body.category,
    images: [
      "http://localhost:5000/images/" + dosya1isim,
      "http://localhost:5000/images/" + dosya2isim,
      "http://localhost:5000/images/" + dosya3isim,
      "http://localhost:5000/images/" + dosya4isim,
    ],
    stock: {
      Black: 0,
      Red: 0,
      Green: 0,
      Blue: 0,
    },
    brand: req.body.brand.toUpperCase(),
    description: req.body.description,
    price: req.body.price,
    sales: 0
  });

  await Product.create(urun);
  await Product.create(urun2);
  await Product.create(urun3);
  await Product.create(urun4);
};

// GET LATEST PRODUCTS !

const getLatestProducts = async (req, res) => {
  try {
    const foundedProducts = await Product.find().limit(32).sort({ _id: -1 });

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
    const foundedProducts = await Product.find().limit(32).sort({ sales: -1 });

    const result = await filterProductsWithProductName(foundedProducts);

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
      productName: { $nin: productName },
    });

    const foundedProducts = await Product.find().sort({ sales: -1 });

    const result = similarProducts.length >= 20 ? await filterProductsWithProductName(similarProducts) : await filterProductsWithProductName(foundedProducts) ;

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
    const params = await req.params;
    console.log(params);

    const findingElement = await Product.findOne({
      productName: params.productName,
      capacity: params.capacity,
    });

    res.status(200).json({ id: findingElement._id.toString() });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};


const updateProductStock = async(req,res) =>{

  try{

    console.log(req.body);

  }catch(err){

    res.json(err);
  }




}

module.exports = {
  addProduct,
  deleteProduct,
  getProductById,
  getLatestProducts,
  getFiveNewestProduct,
  getSimilarProducts,
  getBrandsFromDataBase,
  getBestSellers,
  getProductByCapacity,
  getAllProducts,
  updateProduct,
  updateProductStock
};
