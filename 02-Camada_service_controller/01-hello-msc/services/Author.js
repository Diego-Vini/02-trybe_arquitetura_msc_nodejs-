const Author = require('../models/Author');

const getAll = async() => Author.getAll();

const findById = async(id) => {
  const author = await Author.findById(id)

  if(!author) {
    return {
      error: {
        code: 'notFound',
        message: `não foi possivel encontrar o id ${id}`
      }
    }
  }

  return author;
};

const create = async (firstName, middleName, lastName) => {
    // Buscamos um autor com o mesmo nome completo que desejamos criar
    const existingAuthor = await Author.findByName(firstName, middleName, lastName);
  
    // Caso esse autor já exista, retornamos um objeto de erro informando
    // que não é possível criar o autor pois ele já existe
    if (existingAuthor) {
      return {
        error: {
          code: 'alreadyExists',
          message: 'Um autor já existe com esse nome completo',
        },
      };
    }
    
   return Author.create(firstName, middleName, lastName);
  };
  


module.exports = {
  getAll,
  findById,
  create,
}