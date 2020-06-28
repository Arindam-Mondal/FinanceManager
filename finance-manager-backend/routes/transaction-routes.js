const express = require("express");
const transactionController = require("../controllers/transaction-controllers");

const router = express.Router();

router.get("/user/:uid", transactionController.getTransactionsByUserId);
router.get("/transaction/:tid", transactionController.getTransactionById);
router.get("/", transactionController.getTransactions);
router.post("/", transactionController.createTransaction);

module.exports = router;
