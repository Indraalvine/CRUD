const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  insertNewUser,
  getUser,
  updateUsers,
  deleteUsers,
} = require("../models/users");

const createUser = async (req, res) => {
  try {
    const { name, password, numbers, username } = req.body;

    if (!name || !username || !password) {
      return res.status(400).send({
        message: "some field must be filled, cannot be empty",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await insertNewUser(name, hashedPassword, numbers, username);

    return res.status(201).send({
      message: "new user created",
      data: {
        name: name,
        password: hashedPassword,
        numbers: numbers,
        username: username,
      },
    });
  } catch (error) {
    return res.send({
      message: "server error",
      serverMessage: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        message: "some field must be filled, cannot be empty",
      });
    }

    const [data] = await getUser(username);
    console.log(data);

    if (!data[0]) {
      return res.status(404).send({
        message: `username ${username} not found`,
      });
    }

    if (!data[0].password) {
      return res.status(404).send({
        message: "invalid password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      data[0].password.trim()
    );

    if (!isValidPassword) {
      return res.status(401).send({
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: data[0].id_user,
        name: data[0].name,
        username: data[0].username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    return res.status(200).send({
      message: "login success",
      token: token,
    });
  } catch (error) {
    return res.send({
      message: "server error",
      serverMessage: error.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await updateUsers(body, id);

    res.status(201).send({
      message: "update success",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "server error",
      serverMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUsers(id);

    res.send({
      message: "user deleted",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "server error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  createUser,
  login,
  update,
  deleteUser,
};
