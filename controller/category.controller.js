const Category = require("../Model/Category.model");
const Product = require("../Model/Product.model");

//-----> GET NUMBER OF PRODUCTS BY CATEGORY

const getNumberOfCategory = async (req, res) => {
  // "/category/numberOfProductByCategory/:category"  related api for this controller

  const category = req.params.category;
  const brands =
    req.query.brands === null || req.query.brands === ""
      ? ""
      : req.query.brands;

  const capacities =
    req.query.capacities === null || req.query.capacities === ""
      ? ""
      : req.query.capacities;

  let minPrice = parseInt(req.query.min) === null ? 0 : parseInt(req.query.min);
  let maxPrice = parseInt(req.query.max) === null ? 0 : parseInt(req.query.max);

  let filteringCriteria = {
    category: category,
    brands: brands,
    min: minPrice,
    max: maxPrice,
    capacities: capacities,
  }; // EQUAL WITH =  {category:category,brands:brands,min:min,max:max}

  if (brands !== "") {
    const array = brands.split(",");

    if (array.length > 0) {
      filteringCriteria["brand"] = {
        $in: array,
      };
    }
  }

  if (capacities !== "") {
    const array = capacities.split(",");

    if (array.length > 0) {
      filteringCriteria["capacity"] = {
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
    const page = await req.params.whichPage;
    const choise =await req.query.choise;
    const brands =await req.query.brands;
    const capacities = req.query.capacities;
    let minPrice = parseInt(req.query.min);
    let maxPrice = parseInt(req.query.max);

    console.log("cpa1",capacities);


    let brandsArray = [];
    let capacitiesArray = [];
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

    if (capacities !== "") {
      capacitiesArray = capacities.split(",");

      filteringCriteria["capacity"] = {
        $in: capacitiesArray,
      };
    } else {
      filteringCriteria = {
        category: req.params.category,
        brand: {
          $in: brandsArray,
        },
      };
    }


    if(brands === "" && capacities === ""){

      filteringCriteria = { category: req.params.category }
    }
    
    console.log(capacities);

    
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

    console.log("FIL CRE:",filteringCriteria);

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

// --------->  CREATE CATEGORY

const createCategory = async (req, res) => {
  try {
    const category = {
      categoryName: req.body.categoryName,
      categoryUrl: req.body.categoryUrl,
      categoryDescription: req.body.categoryDescription,
    };

    const createdCategory = await Category.create(category);
    res.json(createdCategory);
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  }
};


const getCategories = async (req,res) =>{

  try{

    const allCategories = await Category.find();

    console.log(allCategories);
    res.json(allCategories)

  }catch(err){
    res.json(err);
  }
}

module.exports = { getCategoryWithPage, getNumberOfCategory, createCategory,getCategories };
