const express = require('express');
const transactionRouter = express.Router();


const transactionService =  require('../services/transactionService');

transactionRouter.post('/', async(req, res) => {
  try {
    const transaction = await transactionService.create(req.body);
    res.send(transaction);
    
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'An error occured, contact the developer' });
  }
});


// transactionRouter.get('/grade/', controller.findAll);
// transactionRouter.get('/grade/:id', controller.findOne);
// transactionRouter.put('/grade/:id', controller.update);
// transactionRouter.delete('/grade/:id', controller.remove);
// transactionRouter.delete('/grade/', controller.removeAll);

module.exports = transactionRouter;
