const express = require("express");
const { getCoupon, postCoupon } = require("../controller/coupon.controller");
const router = express.Router();




router.get("/getCoupon", getCoupon);


router.post("/postCoupon", postCoupon);

module.exports = router;