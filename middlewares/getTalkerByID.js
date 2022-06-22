const { readFile } = require('fs/promises');

const getTalkerByID = async (req, res) => {
  const { id } = req.params;
  const data = await readFile('./talker.json');
  const dataJSON = JSON.parse(data).find((talker) => talker.id === Number(id));
  if (!dataJSON || dataJSON === undefined) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(dataJSON);
  }
};

module.exports = getTalkerByID;