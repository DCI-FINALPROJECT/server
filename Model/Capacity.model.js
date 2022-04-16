const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const capacitySchema = new Schema({
  capacity: {
    type: Number,
    required:true
  },
  capacityName: {
    type: String,
    unique:true
  }
});

const Capacity = mongoose.model("Capacity", capacitySchema);

module.exports = Capacity;