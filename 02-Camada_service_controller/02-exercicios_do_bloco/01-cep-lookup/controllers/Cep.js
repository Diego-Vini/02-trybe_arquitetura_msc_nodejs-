const rescue = require('express-rescue');
const Cep = require('../services/Cep')

const Joi = require('joi');

const getNumberCep = rescue(async (req, res, next) => {
  const { cep } = req.params;
   
  const validateCep = await Cep.getNumberCep(cep);

  if(validateCep.error) return res.status(404).json(validateCep.error);

  res.status(200).json(validateCep);

  next();
});

const createAddress = rescue(async (req, res, next) => {
  const requiredNonEmptyString = Joi.string().not().empty().required();

  // Validamos o corpo da request
  const { error } = Joi.object({
    cep: Joi.string().regex(/\d{5}-\d{3}/).required(),
    logradouro: requiredNonEmptyString,
    bairro: requiredNonEmptyString,
    localidade: requiredNonEmptyString,
    uf: requiredNonEmptyString.length(2),
  }).validate(req.body);

  // Caso haja erro de validação, iniciamos o fluxo de erro
  if (error) return next(error);

  const newCep = await Cep.createAdress(req.body);

  // Caso o service nos retorne um erro
  // if (newCep.error) {
  //   // Iniciamos o fluxo de erro
  //   return next(newCep.error);
  // }

  // Caso contrário, retornamos o status `201 Created`, e o novo CEP, em formato JSON
  res.status(201).json(newCep);


}) 

module.exports = {
  getNumberCep,
  createAddress,
}
