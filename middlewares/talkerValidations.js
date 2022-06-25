const { readFile, writeFile } = require('fs/promises');

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = async (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const rateValidation = async (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const watchedValidation = async (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const newtalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const data = await readFile('./talker.json');
  const talkers = JSON.parse(data);
  const newTalker = {
    id: Number(talkers.length + 1),
    name,
    age,
    talk: { watchedAt, rate },
  };
  const newList = [...talkers, newTalker];
  await writeFile('./talker.json', JSON.stringify(newList));
  return res.status(201).json(newTalker);
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  nameValidation,
  ageValidation,
  tokenValidation,
  talkValidation,
  rateValidation,
  watchedValidation,
  newtalker,
};