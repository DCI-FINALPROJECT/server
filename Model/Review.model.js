const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const reviewSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  date:{
     type:Date,
     default : Date.now
  },
  userId:{
      type:String
  },
  star:{
      type:Number
  },
  like:{
      type:Number
  },
  dislike:{
      type:Number
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
