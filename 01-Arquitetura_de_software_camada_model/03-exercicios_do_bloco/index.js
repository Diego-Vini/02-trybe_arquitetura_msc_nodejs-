const bodyParser = require('body-parser');
const express = require('express');

const postRouter = require('./routes/routePost');
const routeGet = require('./routes/routeGet');

const PORT = 3302

const app = express();
app.use(bodyParser.json());

app.post('/user', postRouter);

app.get('/user', routeGet)

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`)
});