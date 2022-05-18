const express = require("express");
const { getCoupon, postCoupon, getGift, getAllCoupon } = require("../controller/coupon.controller");
const router = express.Router();




router.get("/admin/getCoupon/:couponNumber", getCoupon);

router.get("/allcoupons", getAllCoupon);



router.post("/getGift", getGift);


router.post("/admin/postCoupon", postCoupon);

module.exports = router;