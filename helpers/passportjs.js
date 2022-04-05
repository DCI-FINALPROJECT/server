// PASSPORTJS


const bcrypt = require("bcrypt");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("../Model/User.model");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {


        
        try {

        //  If user is not in our database, we create new user in database.   


        const emailFromPassportLogin = profile._json.email;
        const firstNameFromPassportLogin = profile._json.given_name;
        const lastNameFromPassportLogin = profile._json.family_name;
        const hashedPasswordFromPassportLogin = await bcrypt.hash(
          profile._json.email,
          10
        );

        const findingUser = await User.findOne({
          email: emailFromPassportLogin,
        });

        const newUser = {
          firstName: firstNameFromPassportLogin,
          lastName: lastNameFromPassportLogin,
          email: emailFromPassportLogin,
          password: hashedPasswordFromPassportLogin,
          address: "",
          phone: "",
        };

        console.log("FINDING", findingUser);

        if (!findingUser) {
          await User.create(newUser);
        }

        done(null, profile);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

