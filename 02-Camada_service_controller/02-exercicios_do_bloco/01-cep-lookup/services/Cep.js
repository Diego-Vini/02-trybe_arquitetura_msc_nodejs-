const Cep = require('../models/Cep');

const CEP_REGEX = /\d{5}-?\d{3}/;

const getNumberCep = async(cep) => {

  if (!CEP_REGEX.test(cep)) {
    return {
      error: {
        code: 'invalidData',
        message: 'CEP inválido',
      }
    }
  }

  const returnCep = await Cep.getNumberCep(cep);

  if (!returnCep) {
    return {
      error: {
        code: 'notFound',
        message: 'CEP não encontrado'
      },
    };
  }
  
  return returnCep;
};

const createAdress = async({ cep, logradouro, bairro, localidade, uf }) => {
  const existingCep = await getNumberCep(cep);
  console.log(existingCep)
  if (!existingCep.error) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'CEP já existente',
      },
    };
  }

  return Cep.createAdress({ cep, logradouro, bairro, localidade, uf })
}

module.exports = {
  getNumberCep,
  createAdress
};