const express = require("express");
const googleOauth = express.Router();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const colors = require("colors");

const { userModel } = require("../models/authModel");

require("dotenv").config();

// Configure session middleware for Express
googleOauth.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state from session
googleOauth.use(passport.initialize());
googleOauth.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace this with your logic to fetch user data from your database based on the ID
  done(null, { id });
});

// Configure Passport with Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CLIENT_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Custom logic to handle user profile after authentication
      // Save user details in a database
      saveDataOfUser({ profile });
      done(null, profile);
    }
  )
);

// Function to save user data to the database
async function saveDataOfUser({
  profile: { id, displayName, emails, photos },
}) {
  try {
    // Check if the user already exists in the database
    const isPresent = await userModel.aggregate([{ $match: { emails } }]);
    if (isPresent.length < 0) {
      console.log(isPresent);
    } else {
      // Create a new user document and save it to the database
      const data = new userModel({
        GoogleId: id,
        Name: displayName,
        Email: emails[0].value,
        ProfileUrl: photos[0].value,
        isVerifiedEmail: emails[0].verified,
      });
      await data.save();
    }
  } catch (error) {
    console.log(colors.bgRed.black(`Error in Database : ${error.message}`));
  }
}

// Set up routes for Google OAuth

// Redirect users to Google's authentication page
googleOauth.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback URL after successful authentication
googleOauth.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // Redirect user after successful authentication
    const data = await userModel.find();
    res
      .status(200)
      .json(
        "Email is Verified ... This is for Checking Only ... If this is coming here it means all the things are working fine"
      );
  }
);

module.exports = { googleOauth };