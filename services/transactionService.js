const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');

const create = async (newTransaction) => {
  try {
    const transaction = new TransactionModel(newTransaction);

    await transaction.save();

    return transaction;
  } catch (error) {
    throw error;
  }
};

const findAll = async (period) => {
  try {
    const transactions = await TransactionModel.find({ yearMonth: period });
    return transactions;
  } catch (error) {
    throw error;
  }
};

const findOne = async (id) => {
  try {
    const transaction = await TransactionModel.findById(id);
    return transaction;
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateInfo) => {
  if (!updateInfo) {
    throw new Error('Dados para atualizacao vazio');
  }

  try {
    const transaction = await TransactionModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateInfo,
      { new: true }
    );

    if (!transaction) {
      throw new Error('No documents could be find with this criteria');
    }

    return transaction;
  } catch (error) {
    throw new Error('Error in updating transaction id: ' + id);
  }
};

const remove = async (id) => {
  try {
    const transaction = await TransactionModel.findOneAndDelete({ _id: id });

    if (!transaction) {
     throw new Error('No documents could be find with this criteria');
    }
    return transaction;

  } catch (error) {
    throw new Error('Nao foi possivel deletar o transaction id: ' + id);
  }
};

module.exports = { create, findAll, findOne, update, remove };
