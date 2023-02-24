const NOT_VALIDATED = 400;
const FAIL_TOKEN = 401;

const handleLogin = (_request, response, prox) => {
  const { email, password } = _request.body;
   if (email === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (email !== 'deferiascomigo@gmail.com') {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  if (password === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "password" é obrigatório' });
  } 
  if (password.length < 6) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
  prox();
};

const handleToken = (_request, response, prox) => {
  const { authorization } = _request.headers;
  if (authorization === undefined) {
    return response.status(FAIL_TOKEN).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(FAIL_TOKEN).json({ message: 'Token inválido' });
  }
  if (typeof authorization !== 'string') {
    return response.status(FAIL_TOKEN).json({ message: 'Token inválido' });
  }
  prox();
};

const handleValidityName = (_request, response, prox) => {
  const { name } = _request.body;
  if (name === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  prox();
};

const handleValidityAge = (_request, response, prox) => {
  const { age } = _request.body;
  if (age === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  prox();
};

const handleValidityTalk = (_request, response, prox) => {
  const { talk } = _request.body;
  if (talk === undefined) {
    return response.status(NOT_VALIDATED).json({ message: 'O campo "talk" é obrigatório' });
  }
  prox();
};

const handleValidityWatchedAt = (_request, response, prox) => {
  const { watchedAt } = _request.body.talk;

  const regex = /^\d{2}\/\d{2}\/\d{4}$/.exec(watchedAt);
  if (!watchedAt) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regex) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  prox();
};

const handleValidityRate = (_request, response, prox) => {
  const { rate } = _request.body.talk;
  if (rate === undefined) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return response.status(NOT_VALIDATED)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  prox();
};

module.exports = { 
  handleLogin, 
  handleToken, 
  handleValidityName, 
  handleValidityAge, 
  handleValidityTalk, 
  handleValidityWatchedAt, 
  handleValidityRate };