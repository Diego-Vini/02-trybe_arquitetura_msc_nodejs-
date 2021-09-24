
const connection = require('./connection');

const Author = require('./Author');
const { ObjectId } = require('mongodb');

const serealize = (bookData) => {
  return {
    id: bookData.id,
    title: bookData.title,
    authorId: bookData.author_id
  };
};

const getAll = async () => {
  // const [consultAllBooks] = await connection.execute(
  //     'SELECT id, title, author_id FROM books'
  // );
  // return consultAllBooks.map(serealize);

  return connection()
    .then((db) => db.collection('books').find().toArray())
      .then((books) => 
        books.map((book) => {
          return book;
        })
      )
};

const getByAuthorId = async(id) => {
  if(!ObjectId.isValid(id)) return null;

  const booksData = await connection()
    .then((db) => db.collection('books').findOne(new ObjectId(id)));

    if(!booksData) return nulll;

    return booksData;
};

const isValid= async (title, author_id) => {
  console.log(title)
  console.log(parseInt(author_id))
  if(!title || typeof title != 'string' || title.length < 3) return false;
  if(!author_id || typeof parseInt(author_id) != 'number' || !(await Author.findById(parseInt(author_id)))) return false;

  return true;
};

const createNewBook = async(title, author_id) => {
  connection()
    .then((db) => db.collection('books').insertOne({ title, author_id}))
    .then((result) => {id: result.insetedId, title, author_id} )
};


module.exports = {
  getAll,
  getByAuthorId,
  isValid,
  createNewBook,
};