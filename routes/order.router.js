const express = require("express");
const { createOrder, myActiveOrders, myAllOrders } = require("../controller/order.controller");
const router = express.Router();


router.post("/payment/createOrder",createOrder);

router.post("/myactiveorders", myActiveOrders);

router.post("/myallorders", myAllOrders);

module.exports = router;