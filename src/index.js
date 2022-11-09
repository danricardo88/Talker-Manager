const express = require('express');
const bodyParser = require('body-parser');
const { talkerData } = require('./util/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERRO = 404;
const PORT = '3000';

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
    response.status(HTTP_OK_STATUS).send([]);
    }
    return response.status(HTTP_OK_STATUS).send(tlkr);
}); 

app.get('/talker/:id', async (_request, response) => {
  const tlkr = await talkerData();
  if (!tlkr) {
    response.status(HTTP_ERRO).send([]);
    }
    return response.status(HTTP_OK_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = app;