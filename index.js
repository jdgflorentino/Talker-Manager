const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const getAll = require('./middlewares/getAll');
const getTalkerByID = require('./middlewares/getTalkerByID');
const { emailValidation, passwordValidation } = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getAll);
app.get('/talker/:id', getTalkerByID);
app.post('/login', emailValidation, passwordValidation, (_req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  res.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
