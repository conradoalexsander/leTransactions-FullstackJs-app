const express = require('express');
const transactionRouter = express.Router();

const transactionService = require('../services/transactionService');

transactionRouter.post('/', async (req, res) => {
  try {
    const transaction = await transactionService.create(req.body);
    res.send(transaction);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occured, contact the developer',
    });
  }
});

transactionRouter.get('/', async (req, res) => {
  try {
    const { period } = req.query;
    const transactions = await transactionService.findAll(period);

    if(transactions.length === 0){
      res.send({message: 'No results could be found with this criteria'});
    }

    res.send(transactions);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occured, contact the developer',
    });
  }
});

transactionRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.findOne(id);

    if(transaction.length === 0){
      res.send({message: 'No results could be found with this criteria'});
    }

    res.send(transaction);

  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occured, contact the developer',
    });
  }
});

// transactionRouter.put('/grade/:id', controller.update);
// transactionRouter.delete('/grade/:id', controller.remove);
// transactionRouter.delete('/grade/', controller.removeAll);

module.exports = transactionRouter;
