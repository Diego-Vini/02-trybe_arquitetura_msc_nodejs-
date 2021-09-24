
const connection = require('./connection');

const Author = require('./Author');

const serealize = (bookData) => {
  return {
    id: bookData.id,
    title: bookData.title,
    authorId: bookData.author_id
  };
};

const getAll = async () => {
  const [consultAllBooks] = await connection.execute(
      'SELECT id, title, author_id FROM books'
  );
  return consultAllBooks.map(serealize);
};

const getByAuthorId = async(id) => {
  const [consultBookId] = await connection.execute(
    'SELECT * From books WHERE id = ?',
    [id]
  );
  
  if(consultBookId.length == 0) return null;

  return consultBookId.map(serealize);
};

const isValid= async (title, author_id) => {
  console.log(title)
  console.log(parseInt(author_id))
  if(!title || typeof title != 'string' || title.length < 3) return false;
  if(!author_id || typeof parseInt(author_id) != 'number' || !(await Author.findById(parseInt(author_id)))) return false;

  return true;
};

const createNewBook = async(title, author_id) => {
  connection.execute('INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
  [title, author_id]
  )
};


module.exports = {
  getAll,
  getByAuthorId,
  isValid,
  createNewBook,
};