const Product = require("../Model/Product.model");

//-----> GET NUMBER OF PRODUCTS BY CATEGORY

const getNumberOfCategory = async (req, res) => {
  // "/category/numberOfProductByCategory/:category"  related api for this controller

  const category = req.params.category;
  const brands =
    req.query.brands === null || req.query.brands === ""
      ? ""
      : req.query.brands;

  let minPrice = parseInt(req.query.min) === null ? 0 : parseInt(req.query.min);
  let maxPrice = parseInt(req.query.max) === null ? 0 : parseInt(req.query.max);

  let filteringCriteria = {
    category: category,
    brands: brands,
    min: minPrice,
    max: maxPrice,
  }; // EQUAL WITH =  {category:category,brands:brands,min:min,max:max}

  if (brands !== "") {
    const array = brands.split(",");

    if (array.length > 0) {
      filteringCriteria["brand"] = {
        $in: array,
      };
    }
  }

  if (minPrice > 0 && maxPrice === 0) {
    maxPrice = 9999999999;
  }

  if (
    (minPrice === 0 && maxPrice > 0) ||
    (minPrice > 0 && maxPrice === 0) ||
    (minPrice > 0 && maxPrice > 0)
  ) {
    filteringCriteria["price"] = {
      $gt: minPrice,
      $lt: maxPrice,
    };
  }

  try {
    const result = await Product.find(filteringCriteria);

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
    const brands = req.query.brands;

    let minPrice = parseInt(req.query.min);
    let maxPrice = parseInt(req.query.max);

    console.log(minPrice, maxPrice);

    let brandsArray = [];
    let filteringCriteria;

    if (brands !== "") {
      brandsArray = brands.split(",");

      filteringCriteria = {
        category: req.params.category,
        brand: {
          $in: brandsArray,
        },
      };
    } else {
      filteringCriteria = { category: req.params.category };
    }

    if (minPrice > 0 && maxPrice === 0) {
      maxPrice = 9999999999;
    }

    if (
      (minPrice === 0 && maxPrice > 0) ||
      (minPrice > 0 && maxPrice === 0) ||
      (minPrice > 0 && maxPrice > 0)
    ) {
      filteringCriteria["price"] = {
        $gt: minPrice,
        $lt: maxPrice,
      };
    }

    let criterion = {};

    if (choise === "1") {
      criterion = { _id: -1 }; // This is for new products
    } else if (choise === "2") {
      criterion = { sales: -1 }; // This is for sales
    } else if (choise === "3") {
      criterion = { price: 1 }; // This is for price
    }

    const result = await Product.find(filteringCriteria)
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

module.exports = { getCategoryWithPage, getNumberOfCategory };
