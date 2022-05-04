const { User } = require("../Model/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Order = require("../Model/Order.model");
const { findByIdAndUpdate } = require("../Model/Order.model");
require("dotenv").config();

const jwt_secret_key = process.env.JWT_SECRET_KEY;

const addNewUser = async (req, res) => {
  const errors = validationResult(req);
  const isValid = errors.isEmpty();

  try {
    if (isValid) {
      const { firstName, lastName, email, password, address, phone, birthday } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
        birthday,
      };
      await User.create(newUser);

      res.send("New User is created...");
    } else {
      return res.status(406).json({
        message: "Invalid Input",
        errors: errors.array(),
      });
    }
  } catch (err) {
    res.json({
      status: "Error",
      message: err,
    });
  }
};

//Pass Change controller

const passportChange = async (req, res)=>{

  try{
    console.log(req.body);
    const { currentPass, newPass, email } = req.body;
  
    const findingUser = await User.findOne({ email: email });
    console.log("try calisiyor");
  
    const isTrue = await bcrypt.compare(currentPass, findingUser.password);
    console.log(isTrue);
    if(findingUser && isTrue){
      const id = findingUser._id

      const hashedPassword = await bcrypt.hash(newPass, 10);

      const updatedUser = await User.findByIdAndUpdate({_id:id}, {password:hashedPassword})

      return res.status(200).json({
        updatedUser,
        message: "Successfully login",
      });
    }else{
      res.status(400).json({
        message:"current password or email are false"
      })

    }
  }catch(err){
    console.log(err);
    res.json({
      status: "error",
      message: "pass not changed",
    });
  }

}

// This controller is created to go user page with permission.

const userPageAuth = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

// user login controller

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findingUser = await User.findOne({ email: email });

    const { firstName, lastName } = findingUser;

    const userInformation = { firstName, lastName, email };

    const isTrue = await bcrypt.compare(password, findingUser.password);

    if (findingUser && isTrue) {
      const userToken = jwt.sign({ email: email }, jwt_secret_key);

      console.log(userToken);

      return res.json({
        userToken,
        userInformation,
        message: "Successfully login",
      });
    }

    res.json({
      status: "error",
      message: "Password or E-mail are false!",
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: "Password or E-mail are false!",
    });
  }
};

const findUserController = async (req, res) => {
  try {
    const authFromLogin = await req.header("Authorization");

    const gettingToken = authFromLogin.split(" ")[1];

    const result = jwt.verify(gettingToken, jwt_secret_key);

    console.log("RESULT: ", result);

    const emailFromToken = result.email;

    const findingUser = await User.findOne({ email: emailFromToken });

    if (findingUser) {
      return res.json({
        user: findingUser,
        message: "Successfully authorized",
      });
    } else {
      return res.json({ message: "Email or password is false!" });
    }
  } catch (err) {
    console.log(err);
  }
};


//User Delete controller
const deleteUser = async (req, res) => {
  console.log("function working");
  try {
    console.log("try calisiyor");
    const  {email} = req.body;
    console.log(email);
    const findingUser = await User.findOne({ email: email });

    if(findingUser){
      console.log("if calisiyor");
      const id = findingUser._id

      /* const updatedUser = await User.findByIdAndDelete({_id:id}) */
      res.status(200).json({message:"wird gelöscht"})

    }else{
      res.status(300).json(
        {message:"Account not found"}
      )
    }

  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    });
  }

}

const updateUser = async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.body.id },
      { $set: req.body }
    );

    console.log(result);

    res.json(result);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    });
  }
};

const myActiveOrders = async (req, res) => {
  try {
    const response = await Order.find({
      userEmail: req.body.email,
      result: false,
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

module.exports = {
  addNewUser,
  userPageAuth,
  userLoginController,
  findUserController,
  updateUser,
  myActiveOrders,
  passportChange,
  deleteUser
};
