const Order = require("../Model/Order.model");
const Coupon = require("../Model/Coupon.model")

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

    console.log("products",products);

    const couponstoClient = []
    const coupons = products.filter(product=>{
      return product.capacity.includes("GC")
    })
    if(coupons){
      console.log("if calisiyor");
      coupons.forEach(async coupon=>{
        const giftNumber=coupon.capacity /* "gc25" */
        const findingCoupon =await Coupon.findOne({giftNumber, isBuy:false, isUsed:false})
        console.log(findingCoupon);


        if(findingCoupon){

          const updatedCoupon = await Coupon.findByIdAndUpdate( { _id: findingCoupon._id },
            { isBuy: true })

            console.log("updatedCoupon", updatedCoupon);
          couponstoClient.push(updatedCoupon)
          console.log("couponstoClient", couponstoClient);
        }
      })
    }

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
    const amount = calculateOrderAmount(req.body.products) / 100 - discount;
    const userEmail = req.body.userEmail;
    const userContact = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      address: req.body.user.address,
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
      await res.json({
        success: true,
        orderNumber: orderNumber,
        couponstoClient: couponstoClient
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
};

const myActiveOrders = async (req, res) => {
  try {
    const response = await Order.find({
      userEmail: req.body.email,
      result: false,
    }).sort({ date: -1 });

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

const completedOrders = async (req, res) => {
  try {
    const response = await Order.find({
      userEmail: req.body.email,
      result: true,
    }).sort({ date: -1 });

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

const myAllOrders = async (req, res) => {
  try {
    const response = await Order.find({
      userEmail: req.body.email,
    }).sort({ date: -1 });

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

const getAllNewOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});

    console.log(allOrders);

    const allNewOrders = allOrders.filter((order) => {
      return order.status.length === 1;
    });

    res.status(200).json(allNewOrders);
  } catch (err) {
    res.status(404).json(err);
  }
};

const getShippedOrders = async (req, res) => {
  try {
    const shippedOrders = await Order.find({
      status: ["Order received", "Shipped"],
    });

    console.log(shippedOrders);

    res.status(200).json(shippedOrders);
  } catch (err) {
    res.status(404).json(err);
  }
};

const shipOrder = async (req, res) => {
  console.log(req.body);

  const orderNumber = req.body.orderNumber;
  try {
    await Order.updateOne(
      { orderNumber: orderNumber },
      { status: ["Order received", "Shipped"] }
    );

    res.json(orderNumber);
  } catch (err) {
    res.status(404).json(err);
  }
};

const deliveryOrder = async (req, res) => {
  console.log(req.body);

  const orderNumber = req.body.orderNumber;
  try {
    await Order.updateOne(
      { orderNumber: orderNumber },
      { status: ["Order received", "Shipped", "Delivery"] }
    );

    res.json(orderNumber);
  } catch (err) {
    res.status(404).json(err);
  }
};

const completeOrder = async (req, res) => {
  console.log(req.body);

  const orderNumber = req.body.orderNumber;
  try {
    await Order.updateOne(
      { orderNumber: orderNumber },
      { status: ["Order received", "Shipped", "Delivery", "Completed"] , result : true }
    );

    res.json(orderNumber);
  } catch (err) {
    res.status(404).json(err);
  }
};

const getAllDeliveryOrder = async (req, res) => {
  try {
    const deliveryOrders = await Order.find({
      status: ["Order received", "Shipped", "Delivery"],
    });

    console.log(deliveryOrders);

    res.status(200).json(deliveryOrders);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = {
  createOrder,
  calculateOrderAmount,
  myActiveOrders,
  myAllOrders,
  getAllNewOrders,
  shipOrder,
  getShippedOrders,
  deliveryOrder,
  getAllDeliveryOrder,
  completeOrder
};
