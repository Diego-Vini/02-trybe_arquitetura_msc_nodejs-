const connection = require('./connection');



const createNewUser = async({ firstName, lastName, email, password }) => {
  return connection()
    .then((db) => db.collection('users')
    .insertOne({firstName, lastName, email, password}))
    .then((result) => ({
      id: result.insertedId,
      firstName,
      lastName,
      email,
      password
    }));
};

module.exports = {
  createNewUser,
}