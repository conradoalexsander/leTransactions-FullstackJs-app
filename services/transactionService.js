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

// const findAll = async (req, res) => {
//   const name = req.query.name;

//   //condicao para o filtro no findAll
//   var condition = name
//     ? { name: { $regex: new RegExp(name), $options: 'i' } }
//     : {};

//   try {
//     const grades = await gradeModel.find(condition);
//     res.send(grades);
//     logger.info(`GET /grade`);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: error.message || 'Erro ao listar todos os documentos' });
//     logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
//   }
// };

// const findOne = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const grade = await gradeModel.findById(id);
//     res.send(grade);
//     logger.info(`GET /grade - ${id}`);
//   } catch (error) {
//     res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
//     logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
//   }
// };

// const update = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Dados para atualizacao vazio',
//     });
//   }

//   const id = req.params.id;

//   try {
//     console.log(id);
//     const grade = await gradeModel.findOneAndUpdate(
//       {
//         _id: req.params.id
//       },
//       req.body,
//       { new: true }
//       //retornando o novo objeto 
//     )

//     if (!grade) {
//       res.status(404).send('No documents could be find with this criteria')
//     }

//     res.send(grade);


//     logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
//   } catch (error) {
//     res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
//     logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
//   }
// };

// const remove = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const grade = await gradeModel.findOneAndDelete({ _id: req.params.id })

//     if (!grade) {
//       res.status(404).send('No documents could be find with this criteria')
//     }

//     res.send({ message: 'Grade excluido com sucesso' });

//     logger.info(`DELETE /grade - ${id}`);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
//     logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
//   }
// };

module.exports = {create }