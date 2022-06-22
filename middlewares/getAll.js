const { readFile } = require('fs/promises');

const getAll = async (_req, res) => {
  const data = await readFile('./talker.json', 'utf-8');
  const dataJSON = JSON.parse(data);
  if (dataJSON.length === 0) {
    res.status(200).json([]);
  } else {
    res.status(200).json(dataJSON);
  }
};

module.exports = getAll;