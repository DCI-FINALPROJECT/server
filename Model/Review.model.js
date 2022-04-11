const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const reviewSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
  content: {
    type: String,
  },
  date:{
     type:String 
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