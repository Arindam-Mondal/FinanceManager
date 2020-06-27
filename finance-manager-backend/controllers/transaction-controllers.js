const Transaction = require("../models/transaction");

/**
 * Creates a new Transaction
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const createTransaction = async (req, res, next) => {
  //TODO new to use validations

  const { amount, type, description } = req.body;

  const createdTransaction = new Transaction({
    amount: req.body.amount,
    type: req.body.type,
    description: req.body.description,
  });

  try {
    await createdTransaction.save();
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

exports.createTransaction = createTransaction;
exports.getTransactions = getTransactions;
exports.getTransactionById = getTransactionById;
