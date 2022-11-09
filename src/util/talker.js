const { readFile } = require('fs').promises;
const path = require('path');

async function talkerData() {
  try {
    const response = await readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(response);
  } catch (error) {
    return console.error(`Erro: ${error}`);
  } 
}

module.exports = { talkerData };