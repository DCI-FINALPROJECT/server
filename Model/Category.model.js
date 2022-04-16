const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique:true
  },
  categoryUrl: {
    type: String,
    required: true,
    unique:true
  },
  categoryDescription: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
