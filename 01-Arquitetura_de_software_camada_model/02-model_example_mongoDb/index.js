const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3001;

const Author = require('./models/Author');
const Books = require('./models/Books');

app.use(bodyParser.json());



app.get('/authors', async (req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;


  const dataAuthorId = await Author.findById(id);

  if(!dataAuthorId) return res.status(404).json({message: 'Not find'})

  res.status(200).json(dataAuthorId)
});

app.get('/books', async (req, res) => {
  const books = await Books.getAll();
  
  if(!books) return res.status(400).json({Message: 'Not found'})

  res.status(200).json(books)
});

app.get('/books/:id', async(req, res) => {
  const { id } = req.params;
  const bookId = await Books.getByAuthorId(id);

  if(bookId == null) return res.status(401).json({ Message: 'Not found'});

  res.status(200).json(bookId);
});

app.post('/authors', async(req, res) => {
  const {first_name,middle_name, last_name} = req.body;

  if (!Author.isValid(first_name, middle_name, last_name)) return res.status(400).json({ Message: 'Not Found' });
  
  await Author.createNewAuthor(first_name, middle_name, last_name);

  res.status(201).json({ Message: 'Novo autor criado com sucesso'});
});

app.post('/books', async(req, res) => {
  const {title, author_id} = req.body;

  console.log(title);
  console.log(author_id);

  if(!Books.isValid(title, author_id)) return res.status(400).json({Message: 'Dados inválidos'});

  await Books.createNewBook(title, author_id);

  res.status(201).json({ Message: 'Livro criado com sucesso! '});
})


app.listen(port, () => {
  console.log('✔ Aplicação rodando na port 3001!!')
})