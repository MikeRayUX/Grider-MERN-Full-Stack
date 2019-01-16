// commonjs modules becuase node itself does not support import
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// order is important, require the user model BEFORE passport
require("./models/User");
require("./services/passport");

// connect to mlab mongodb
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);

const app = express();

// middleware
app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// middleware
app.use(passport.initialize());
// middleware
app.use(passport.session());

// OAuth Routes
require("./routes/authRoutes")(app);

// Bind port for Heroku
const PORT = process.env.PORT || 5000;
// tells node to listen for traffic on localhost:/5000
app.listen(PORT);
