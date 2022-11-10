const express = require('express');
const bodyParser = require('body-parser');
const { talkerData, writeNemTlkrIdData } = require('./util/talker');
const { 
  handleLogin, 
  handleToken, 
  handleValidityName, 
  handleValidityAge, 
  handleValidityTalk, 
  handleValidityWatchedAt, 
  handleValidityRate } = require('./util/validations');

// const { handleLogin } = require('./util/test');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_OK_NEWTLKR = 201;
const HTTP_ERRO = 404;
const PORT = '3000';

// const NOT_VALIDATED = 400;
// const testRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2-3}/i; <-- dando problema.
// const tokenAleatorio = Math.random().toString().slice(-16);

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

app.post('/login', handleLogin, (_request, response) => {
  const tokenAleatorio = Math.random().toString().slice(-16);
  response.status(HTTP_OK_STATUS).json({ token: tokenAleatorio });
});

app.post('/talker', 
  handleToken, handleValidityName,
  handleValidityAge, handleValidityTalk, 
  handleValidityWatchedAt, handleValidityRate,

async (_request, response) => {
  const newTalker = _request.body;
  const withNewTlkrId = await writeNemTlkrIdData(newTalker);
  return response.status(HTTP_OK_NEWTLKR).json(withNewTlkrId);
});

module.exports = app;