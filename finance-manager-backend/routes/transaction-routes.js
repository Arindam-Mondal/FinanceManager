const express = require("express");
const transactionController = require("../controllers/transaction-controllers");

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/transaction/:tid", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);

module.exports = router;
