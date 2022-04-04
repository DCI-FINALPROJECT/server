var express = require("express");
const { addNewUser } = require("../controller/user.controller");
var router = express.Router();
const { body } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST Create a new User

router.post(
  "/newUser",

  body("name").exists().withMessage("Person can not be empty!"),
  body("surname").exists().withMessage("Person can not be empty!"),
  body("email")
    .exists()
    .isEmail()
    .withMessage(
      "Email can not be empty and It must be written in the correct format!"
    ),
  body("password")
    .exists()
    .isLength({ min: 6 })
    .withMessage(
      "Password can not be empty and should be minimum 6 characters!"
    ),

  addNewUser
);

module.exports = router;
