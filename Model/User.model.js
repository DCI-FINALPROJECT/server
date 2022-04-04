const mongoose =  require("mongoose");


const { model, Schema } = mongoose;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    // select:false  ATTENTION: This statement should be added!
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const User = model("user", userSchema, "user");

module.exports = {User};
