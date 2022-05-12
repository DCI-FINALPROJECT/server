const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const orderSchema = new Schema({
  amount: {
    type: Number,
  }, 
  discount: {
    type: Number,
  },
  userId: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  products: {
    type: Array,
  },
  paymentId: {
    type: String,
  },
  date: {
    type: Date,
  },
  orderNumber: {
    type: String,
  },
  status: {
    type: Array,
  },
  result: {
    type: Boolean,
    default: false,
  },
  userContact: { type: Object },
  address: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
