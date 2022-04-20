const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productNameWithCapacity:{
      type:String
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: SchemaTypes.Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  stars: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  sales: {
    type: Number,
  },
  capacity: {
    type: String,
    required: true,
  },
  stock: {
    Black: {
      type: Number,
    },
    Red: {
      type: Number,
    },
    Green: {
      type: Number,
    },
    Blue: {
      type: Number,
    },
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
