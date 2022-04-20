const Product = require("../Model/Product.model");
const Review = require("../Model/Review.model");

const getReviewById = async (req, res) => {
  try {
    const findingReview = await Review.find({ productName: req.params.productName }).sort({date:-1});
    res.json(findingReview)
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};

const addReview = async (req, res) => {

  console.log("REW:",req.body);

  try {   

    const review = {
      productName:req.body.productName,
      name: req.body.name,
      content: req.body.review,
      userId: req.body.userId,
      star: req.body.star,
      photo:req.body.photo,
      like: 0,
      dislike: 0,
    };
    await Review.create(review);

    const reviews = await Review.find({});   
    
    
    let total = 0;    
    reviews.map(element=>{
      

      total += element.star;

      return total;
    });
    
    let avarageStar = (total/reviews.length).toFixed(0);

    const products = await Product.find({productName:review.productName});

    products.forEach(product=>{

      await 

    })



    res.json(review);
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};

module.exports = { getReviewById, addReview };
