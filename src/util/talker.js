const { readFile } = require('fs').promises;
const path = require('path');

// const testRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2-3}/i;
// const NOT_VALIDATED = 400;

async function talkerData() {
  try {
    const response = await readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(response);
  } catch (error) {
    return console.error(`Erro: ${error}`);
  } 
}

// const handleLogin = (request, response, prox) => {
//   const { email, password } = request.body;
//   if (!password) {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O campo "password" é obrigatório' });
//   } 
//   if (password.length < 6) {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
//   } 
//   if (!email) {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O campo "email" é obrigatório' });
//   } 
//   if (!testRegex.test(email)) {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   } 
//   prox();
// };

module.exports = { talkerData /* handleLogin */ };