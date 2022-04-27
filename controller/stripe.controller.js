const { calculateOrderAmount } = require("./order.controller");

// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE;
const stripe = require("stripe")(KEY);

const stripeController = (req, res) => {

  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: calculateOrderAmount(req.body.amount),
      currency: "eur",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = { stripeController };
