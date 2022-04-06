const { User } = require("../Model/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addNewUser = async (req, res) => {
  const errors = validationResult(req);
  const isValid = errors.isEmpty();

  try {
    if (isValid) {
      const { firstName, lastName, email, password, address, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
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


// This controller is created to go user page with permission.

const userPageAuth = (req,res)=>{

  res.status(200).json({
    status:"success"
  })

}

module.exports = { addNewUser,userPageAuth };
