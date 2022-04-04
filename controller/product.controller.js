
const Product = require("../Model/Product.model.js")
const {validationResult} = require('express-validator')


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

const addProduct = async (req, res) => {
  const data = req.body;
    
    try{
        
        if(!(data.productName && data.category && data.brand && data.price && data.description && data.images && data.quantities) ) {
          return  res.status(401).send('missing information')
        }

        const errors = validationResult(req);
        const isValid = errors.isEmpty();

        if(isValid){

            const product = new Product({
                productName: data.productName,
                category: data.category,
                brand: data.brand,
                price: data.price,
                description: data.description,
                images: data.images,
                quantities: data.quantities,
                reviews:data.reviews,
                stars: data.stars
            })
        
            await product.save();
           return res.status(200).send(product)
        }else {
            res.status(406).json({
              message: "invalid input",
              errors: errors.array(),
            });
          }
    
    }catch(err){
        res.send(err)
      
  try {
    if (
      !(
        data.productName &&
        data.category &&
        data.brand &&
        data.price &&
        data.description &&
        data.images &&
        data.quantities
      )
    ) {
      return res.status(401).send("missing information");
    }

    const product = new Product({
      productName: data.productName,
      category: data.category,
      brand: data.brand,
      price: data.price,
      description: data.description,
      images: data.images,
      quantities: data.quantities,
      reviews: data.reviews,
      stars: data.stars,
    });

    await product.save();
    return res.status(200).send(product);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addProduct, getProductById };
