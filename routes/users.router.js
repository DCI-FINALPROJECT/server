var express = require("express");
const {
  addNewUser,
  userPageAuth,
  userLoginController,
  findUserController,
  updateUser,
  myActiveOrders,
  passportChange,
} = require("../controller/user.controller");
var router = express.Router();
const { body } = require("express-validator");
const auth = require("../Middleware/auth.jwt.middleware");
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST Create a new User

router.post(
  "/newUser",

  body("firstName").exists().withMessage("Person can not be empty!"),
  body("lastName").exists().withMessage("Person can not be empty!"),
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

//user password change

router.put(`/user/passchange`, passportChange);

// This route is created to go user page with permission.

router.get("/userpage", auth, userPageAuth);

router.post("/userlogin", userLoginController);

router.get("/finduser", findUserController);

router.patch("/updateuser", updateUser);

router.post("/myactiveorders", myActiveOrders);

module.exports = router;
