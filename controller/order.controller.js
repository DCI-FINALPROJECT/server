const Order = require("../Model/Order.model");

const calculateOrderAmount = (items) => {
  let total = 0;

  items.forEach((element) => {
    total += parseFloat(element.price * element.quantities * 100);
  });

  return total;
};

const createOrder = async (req, res) => {  

  try {
    const products = req.body.products;
    const discount = req.body.discount
    const paymentId = await req.body.stripeToken.card.id;
    const userId = await req.body.userId;
    const date = new Date();
    const orderNumber =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "-" +
      Math.floor(Math.random() * 999999 + 100000);
    const amount = (calculateOrderAmount(req.body.products) / 100)-discount;
    const userEmail = req.body.userEmail;
    const userContact = {
      firstName: req.body.user.firstName,
      lastName : req.body.user.lastName,
      email : req.body.user.email,
      address:req.body.user.address,
      phone: req.body.user.phone,
    };
    const address = req.body.address;

    const newOrder = {
      discount,
      products,
      paymentId,
      userId,
      orderNumber,
      amount,
      date,
      userEmail,
      userContact,
      address,
    };

    const response = await Order.create(newOrder);

    if (response) {
      res.json({
        success: true,
        orderNumber: orderNumber,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
};

module.exports = { createOrder, calculateOrderAmount };
