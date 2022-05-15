const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const couponSchema = new Schema({
  couponNumber: {
    type: String,
    required: true
  },
  giftNumber: {
    type: String,
    required: true
  },
  couponAmount: {
    type: Number,
    required: true
  },
  isUsed: {
    type: Boolean
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;