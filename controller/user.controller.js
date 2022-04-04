const { User } = require("../Model/User.model");
const bcrypt = require("bcrypt");


// UNCOMPLEATED POST REQ FOR USER


const addNewUser = async (req, res) => {
  try {

    const {name, surname,email,password,address,phone} = req.body
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {name, surname,email,password:hashedPassword,address,phone}
    await User.create(newUser);

    res.send("New User is created...");
  } catch (err) {
    res.json({
      status: "Error",
      message: err,
    });
  }
};

module.exports = { addNewUser };
