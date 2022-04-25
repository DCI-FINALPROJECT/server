const express = require("express");
const { createOrder } = require("../controller/order.controller");
const router = express.Router();


router.post("/payment/createOrder",createOrder);

module.exports = router;