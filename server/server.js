const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require apis
app.get("/", (req, res) => {
  res.json("hello amazon");
})

app.post("/", (req, res) => {
  console.log(req.body.name);
})

app.listen(4000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on PORT", 4000);
  }
});