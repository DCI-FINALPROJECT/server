const { User } = require("../Model/User.model");


// UNCOMPLEATED POST REQ FOR USER


const addNewUser = async (req, res) => {
  try {

    const newUser = req.body
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
