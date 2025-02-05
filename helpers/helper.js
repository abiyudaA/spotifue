const bcrypt = require('bcryptjs');

const hashPassword = (pw) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
};

const comparePassword = (pw, hash) => {
  return bcrypt.compareSync([pw, hash]);
};

module.exports = {
  hashPassword,
  comparePassword,
};