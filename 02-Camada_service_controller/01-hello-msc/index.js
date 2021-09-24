const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Author = require('./controllers/Author');
const errorMiddleware = require('./middlewares/error')

app.get('/authors', Author.getAll);

app.get('/authors/:id', Author.findById);

app.post('/authors', Author.create);

app.use(errorMiddleware);

const PORT = 3007;

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`)
});