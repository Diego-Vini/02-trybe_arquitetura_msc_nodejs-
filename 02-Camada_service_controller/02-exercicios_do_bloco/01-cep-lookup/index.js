const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const Cep = require('./controllers/Cep')

app.get('/cep/:cep', Cep.getNumberCep);

app.post('/cep', Cep.createAddress)

const PORT = process.env.PORT;

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`)});

