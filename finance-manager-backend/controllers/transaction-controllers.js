const Transaction = require("../models/transaction");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

/**
 * Creates a new Transaction
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const createTransaction = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { amount, type, description, user } = req.body;

  const createdTransaction = new Transaction({
    amount: amount,
    type: type,
    description: description,
    user: user,
    date: new Date(),
  });

  //First validate if the user exists
  let transactionUser;
  try {
    transactionUser = await User.findById(user);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!transactionUser) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTransaction.save({ session: sess });
    transactionUser.transactions.push(createdTransaction);
    await transactionUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating Transaction failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ transaction: createdTransaction });
};

const getTransactions = async (req, res, next) => {
  const debitTransactions = await Transaction.find().exec();
  res.json(debitTransactions);
};

/**
 * Find Transactions By Id
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const getTransactionById = async (req, res, next) => {
  const transactionId = req.params.tid;

  let transaction;
  try {
    transaction = await Transaction.findById(transactionId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a transaction.",
      500
    );
    return next(error);
  }

  if (!transaction) {
    const error = new HttpError(
      "Could not find a transaction for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ transaction: transaction.toObject({ getters: true }) });
};

/**
 * Get all the transactions for a given user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getTransactionsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  console.log("userID " + userId);
  let userWithTransactions;
  try {
    userWithTransactions = await User.findById(userId).populate("transactions");
  } catch (err) {
    const error = new HttpError(
      "Fetching Transactions failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithTransactions || userWithTransactions.transactions.length === 0) {
    return next(
      new HttpError("Could not find transaction for the provided user id.", 404)
    );
  }

  res.json({
    transactions: userWithTransactions.transactions.map((transaction) =>
      transaction.toObject({ getters: true })
    ),
  });
};

exports.createTransaction = createTransaction;
exports.getTransactions = getTransactions;
exports.getTransactionById = getTransactionById;
exports.getTransactionsByUserId = getTransactionsByUserId;
