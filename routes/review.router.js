const express = require("express");
const { getReviewById, addReview } = require("../controller/review.controller");
const router = express.Router();



router.get("/review/:id",getReviewById);

router.post("/review/addReview",addReview);



module.exports = router;