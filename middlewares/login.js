const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = validator.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidation = async (req, res, next) => {
  const { password } = req.body;
  const MIN_PASSWORD_LENGTH = 6;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};