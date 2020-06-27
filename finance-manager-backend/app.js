const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const transactionRoutes = require("./routes/transaction-routes");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://arindam:arindam@cluster0.2nknc.azure.mongodb.net/finance?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000);
  })
  .catch(() => {
    console.log("Connection failed!");
  });
