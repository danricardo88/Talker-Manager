const express = require('express');
const bodyParser = require('body-parser');
const { talkerData } = require('./util/talker');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERRO = 404;
const PORT = '3000';
const NOT_VALIDATED = 400;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_request, response) => {
  const tlkr = await talkerData();
  if (!tlkr) {
    response.status(HTTP_OK_STATUS).json([]);
    }
    return response.status(HTTP_OK_STATUS).json(tlkr);
}); 

app.get('/talker/:id', async (_request, response) => {
  const tlkr = await talkerData();
  const { id } = _request.params;
  const idTlkr = await tlkr.find((talker) => talker.id === Number(id));
  if (!idTlkr) {
    response.status(HTTP_ERRO).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).json(idTlkr);
});

function handleLogin(_request, response, prox) {
  const { email, password } = _request.body;
  if (email === undefined) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O campo "email" é obrigatório' });
  } if (email !== 'emailtaerradocabra@hotmail.com') {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (password === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } prox();
}

app.post('/login', handleLogin, async (_request, response) => {
  const tokenAleatorio = Math.random().toString().slice(-16);
  response.status(HTTP_OK_STATUS).json({ token: tokenAleatorio });
  });
module.exports = app;
