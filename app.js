const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const passportSetUp = require("./helpers/passportjs")
const cookieSession = require("cookie-session");
const authRoute = require("./Middleware/auth.passportjs");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/product.router");
const categoryRouter = require("./routes/category.router");
const reviewRouter = require("./routes/review.router");
const capacityRouter = require("./routes/capacity.router");

const app = express();

//cors

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 

app.use(
  cookieSession({
    name: "session",
    keys: ["dcifinalproject"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", productsRouter);
app.use("/",categoryRouter);
app.use("/",reviewRouter);
app.use("/",capacityRouter);
app.use("/auth", authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Mongoose

const URI = process.env.MONGOOSE;

mongoose.connect(URI, (err) => {
  console.log("Connected to DB");
});

module.exports = app;
