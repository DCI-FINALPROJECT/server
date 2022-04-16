const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const reviewSchema = new Schema({
  productName:{
    type:String
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
  photo:{
    type:String
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
