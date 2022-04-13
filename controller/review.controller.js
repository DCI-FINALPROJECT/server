const Review = require("../Model/Review.model");

const getReviewById = async (req, res) => {
  try {
    const findingReview = await Review.find({ productId: req.params.id });
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
    const review = {
      productId: req.body.productId,
      name: req.body.name,
      content: req.body.content,
      date: "13 Nisan",
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
