const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// pulling the schema out of mongoose without using require
// which will cause multiple model imports in development bug
const User = mongoose.model("users");

// create and set cookie
passport.serializeUser((user, done) => {
  // user.id is the id of the db record not profile.id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// tells passport to create a new instance of google passport strategy.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      // fixes heroku proxy issue
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user exists in db first
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
          done(null, existingUser);
        } else {
          // create a new model
          new User({ googleId: profile.id })
            // save to db
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
