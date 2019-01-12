// commonjs modules becuase node itself does not support import
const express = require("express");
const app = express();

// create a route handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// Bind port for Heroku
const PORT = process.env.PORT || 5000;

// tells node to listen for traffic on localhost:/5000
app.listen(PORT);
