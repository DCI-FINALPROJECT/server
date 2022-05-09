const express = require("express");
const { getCoupon, postCoupon } = require("../controller/coupon.controller");
const router = express.Router();




router.get("/admin/getCoupon/:couponNumber", getCoupon);


router.post("/admin/postCoupon", postCoupon);

module.exports = router;