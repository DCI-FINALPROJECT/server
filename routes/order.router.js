const express = require("express");
const { createOrder, myActiveOrders, myAllOrders, getAllNewOrders, shipOrder, getShippedOrders, deliveryOrder, getAllDeliveryOrder, completeOrder } = require("../controller/order.controller");
const router = express.Router();


router.post("/payment/createOrder",createOrder);

router.post("/myactiveorders", myActiveOrders);

router.post("/myallorders", myAllOrders);

router.get("/allneworders",getAllNewOrders);

router.patch("/shiporder",shipOrder);

router.patch("/deliveryOrder",deliveryOrder);

router.patch("/completeorder",completeOrder);

router.get("/shippedorders",getShippedOrders);

router.get("/getalldeliveryorder",getAllDeliveryOrder);

module.exports = router;