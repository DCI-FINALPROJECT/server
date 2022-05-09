const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User.model");
require("dotenv").config();

const CLIENT_URL = "http://localhost:3000/";

const jwt_secret_key = process.env.JWT_SECRET_KEY;

router.get("/login/success", async (req, res) => {
  if (req.user) {
    const emailFromPassportLogin = req.user._json.email; // This request come from client/app.js/getUser funct.

    const findingUser = await User.findOne({ email: emailFromPassportLogin });

    console.log("REQ USER:", emailFromPassportLogin);

    res.status(200).json({
      success: true,
      message: "successfull",
      user: findingUser,
      cookies: req.cookies,
      token: jwt.sign({ email: emailFromPassportLogin }, jwt_secret_key), // JWT was produced, here.
    });
  } else {
    res.send("Unauthorized");
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

// GOOGLE

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
