const mongoose =  require("mongoose");


const { model, Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
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
  photo:{
    type:String
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  birthday:{
    type:String
  }
});

const User = model("user", userSchema, "user");

module.exports = {User};
