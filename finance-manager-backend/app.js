const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/user", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(5000);
