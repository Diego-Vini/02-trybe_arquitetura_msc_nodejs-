const connection = require('./connection');

function formatUser(document) {
  const {
    _id,
    ...user
  } = document;

  const formattedResult = {
    id: _id,
    ...user,
  };

  return formattedResult;
};

const queryUsers = async () => {
  return connection()
    .then((db) => db.collection('users').find().toArray())
    .then((users) => users.map(formatUser))
};

module.exports = queryUsers;