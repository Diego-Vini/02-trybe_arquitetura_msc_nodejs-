const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
  .then((db) => db.collection('authors').find().toArray())
  .then((authors) => {
    return authors.map(({_id, firstName, middleName, lastName}) => 
      getNewAuthor({
        id: _id,
        firstName,
        middleName,
        lastName,
      })
    )
  });
}

const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;
  
  const fullName = [firstName, middleName, lastName]
  .filter((name) => name)
  .join(' ');

  return {
    id,
    firstName,
    middleName,
    lastName,
    name: fullName,
  }
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  const authorData = await connection()
    .then((db) => db.collection('authors').findOne(new ObjectId(id)));

  if (!authorData) return null;

  const { firstName, middleName, lastName } = authorData;

  return getNewAuthor({ id, firstName, middleName, lastName });
  
};

const isValid = (firstName, middleName, lastName) => {
  if(middleName && typeof middleName !== 'string') return false;

  return isNonEmptyString(firstName) && isNonEmptyString(lastName);
}

const isNonEmptyString = (value) => {
  if(!value) return false;

  return typeof value === 'string';
};

const create = async(firstName, middleName, lastName) => {
    return connection()
    .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
    .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }))
};

const findByName = async (firstName, middleName, lastName) => {
    // Determinamos se devemos buscar com ou sem o nome do meio
    const query = middleName
      ? { firstName, middleName, lastName }
      : { firstName, lastName };
  
    // Executamos a consulta e retornamos o resultado
    const author = await connection()
      .then((db) => db.collection('authors').findOne(query));
  
    // Caso nenhum author seja encontrado, devolvemos null
    if (!author) return null;
  
    // Caso contrário, retornamos o author encontrado
    return getNewAuthor(author);
  };

module.exports = {
  getAll,
  findById,
  isValid,
  create,
  findByName,
};