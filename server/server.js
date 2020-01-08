const dotenv = require('dotenv');
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require apis
const router = express.Router();
require('./routes')(app, router)

app.listen(4000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on PORT", 4000);
  }
});