var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoute = require("./routes/auth");
const cors = require ('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require("./routes/product.router");


var app = express();


//cors

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders:["Content-Type","Authorization"]
  })
);



// PASSPORTJS

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {


  console.log(profile);
 
  done(null,profile)
}
));



passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})


app.use(
cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth",authRoute);







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/', usersRouter);
app.use("/", productsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Mongoose

const URI = process.env.MONGOOSE;

mongoose.connect(URI,err=>{
  console.log("Connected to DB");
})

module.exports = app;
