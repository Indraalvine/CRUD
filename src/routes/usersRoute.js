const express = require("express");
const router = express.Router();
const tokenValidation = require("../middlewares/tokenValidation");

const {
  createUser,
  login,
  update,
  deleteUser,
} = require("../controller/usersController");

router.post("/register", createUser);
router.post("/login", login);
router.patch("/:id", tokenValidation, update);
router.delete("/:id", tokenValidation, deleteUser);

module.exports = router;
