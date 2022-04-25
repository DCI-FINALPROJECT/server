const { stripeController } = require("../controller/stripe.controller");

const router = require("express").Router();

router.post("/payment", stripeController);



module.exports = router;