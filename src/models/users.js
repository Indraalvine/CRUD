const dbPool = require("../config/database");

const insertNewUser = (name, password, numbers, username) => {
  const query = `INSERT INTO users (name, password, numbers, username) VALUES('${name}', ' ${password}', '${numbers}', '${username}' )`;

  return dbPool.execute(query);
};

const getUser = (username) => {
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  return dbPool.execute(query);
};

const updateUsers = (body, id) => {
  const query = `UPDATE users SET numbers='${body.numbers}', username='${body.username}' WHERE idusers='${id}' `;

  return dbPool.execute(query);
};

const deleteUsers = (id) => {
  const query = `DELETE FROM users WHERE idusers='${id}'`;

  return dbPool.execute(query);
};

module.exports = {
  insertNewUser,
  getUser,
  updateUsers,
  deleteUsers,
};
