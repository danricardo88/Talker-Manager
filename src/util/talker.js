const { readFile } = require('fs').promises;
const path = require('path');

async function talkerData() {
  const response = await readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  return JSON.parse(response);
}

module.exports = { talkerData };