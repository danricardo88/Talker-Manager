const express = require('express');
const bodyParser = require('body-parser');
const { talkerData, writeNemTlkrIdData, upTalker, deleteTalker } = require('./util/talker');
const { 
  handleLogin, 
  handleToken, 
  handleValidityName, 
  handleValidityAge, 
  handleValidityTalk, 
  handleValidityWatchedAt, 
  handleValidityRate } = require('./util/validations');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_OK_NEWTLKR = 201;
const HTTP_DELETED_TLKR = 204;
const HTTP_ERRO = 404;
const PORT = '3000';

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

app.put('/talker/:id',
  handleToken, handleValidityName,
  handleValidityAge, handleValidityTalk, 
  handleValidityWatchedAt, handleValidityRate,
  async (_request, response) => {
    const { id } = _request.params;
    const upTalkerData = _request.body;
    const talkerUp = await upTalker(Number(id), upTalkerData);
    return response.status(HTTP_OK_STATUS).json(talkerUp);
});

app.delete('/talker/:id', handleToken, async (_request, response) => {
  const { id } = _request.params;
  await deleteTalker(id);
  return response.sendStatus(HTTP_DELETED_TLKR).end();
});

module.exports = app;