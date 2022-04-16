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
  try {

    const productName="SAMSUNG Galaxy A52s 5G Dual SIM" // This content will come from review button (with params), later.

    const review = {
      productId: req.body.productId,
      productName:productName,
      name: req.body.name,
      content: req.body.content,
      date: req.body.date,
      userId: req.body.userId,
      star: req.body.star,
      like: 0,
      dislike: 0,
    };
    await Review.create(review);

    res.json(review);
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};

module.exports = { getReviewById, addReview };
