const { readFile, writeFile } = require('fs').promises;
// const { fs } = require('fs');
const path = require('path');

async function talkerData() {
  try {
    const response = await readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(response);
  } catch (error) {
    return console.error(`Erro: ${error}`);
  } 
}

async function writeNemTlkrIdData(newTalker) {
  try {
    const oldTalkers = await talkerData();
    const withNewTlkrId = { id: oldTalkers.length + 1, ...newTalker };
    const allTalkers = JSON.stringify([...oldTalkers, withNewTlkrId]);
    await writeFile(path.resolve(__dirname, '../talker.json'), allTalkers);
    return withNewTlkrId;
  } catch (error) {
    return console.error(`Erro: ${error}`);
  }
}

async function upTalker(idtalker, upNewTalker) {
  try {
    const oldTalkers = await talkerData();
    const index = oldTalkers.findIndex((talk) => talk.id === idtalker);
    oldTalkers[index] = { id: idtalker, ...upNewTalker };
    const talkers = JSON.stringify(oldTalkers);
    await writeFile(path.resolve(__dirname, '../talker.json'), talkers);
    return oldTalkers[index];
  } catch (error) {
    return console.error(`Erro: ${error}`);
  }
}

const deleteTalker = async (id) => {
  try {
    const oldTalkers = await talkerData();
    const filter = oldTalkers.filter((talk) => talk.id !== Number(id));
    const allTalkers = JSON.stringify([...filter]);
    await writeFile(path.resolve(__dirname, '../talker.json'), allTalkers);
    return oldTalkers;
  } catch (error) {
    return console.error(`Erro: ${error}`);
  }
};

module.exports = { talkerData, writeNemTlkrIdData, upTalker, deleteTalker };