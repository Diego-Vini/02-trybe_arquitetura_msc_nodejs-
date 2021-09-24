const { ObjectId } = require('mongodb')
const connection = require('./connection');

const getNewAuthor = ({id, firstName, middleName, lastName}) => {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(" ");
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName
  }
}

const serealize = (authorData) => {
  return{
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name
  }
}

const getAll = async () => {
  return connection()
      .then((db) => db.collection('authors').find().toArray())
          .then((authors) =>
              authors.map(({ _id, firstName, middleName, lastName }) =>
              getNewAuthor({
                  id: _id,
                  firstName,
                  middleName,
                  lastName,
              })
          )
      );
}

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null
  }

  const authorData = await connection()
    .then((db) => db.collection('authors').findOne(new ObjectId(id)));

    if(!authorData) return null;

    return authorData;
};

const isValid = (firstName, middleName, lastName) => {
  if(!firstName || typeof firstName != 'string') return false;
  if(!lastName || typeof lastName != 'string') return false;

  return true;
};

const createNewAuthor = async(firstName, middleName, lastName ) => {
  connection()
    .then((db) => db.collection('authors').insertOne({firstName, middleName, lastName}))
    .then((result) => getNewAuthor({id: result.insertedId, firstName, middleName, lastName}));
}; 

module.exports = {
  getAll,
  findById,
  isValid,
  createNewAuthor
};