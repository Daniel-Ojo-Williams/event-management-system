const { user } = require("../../models");
const { asyncWrapper } = require("../../utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const signUp = asyncWrapper(async (req, res) => {
  let { name, email, password } = req.body;
  if (!password) throw new Error("Please enter a password");
  let user = user.build({ name, email, password });
  await newUser.save();

  const privateKey = process.env.JWT_PRIVATE_KEY;
  const access_token = jwt.sign({ user }, privateKey, { expiresIn: "1h" });

  res
    .header("Authorization", `Bearer ${access_token}`)
    .status(201)
    .json({ message: "User created successfully" });
});

const logIn = asyncWrapper(async (req, res) => {
  let { email, password } = req.body;

  let userFound = await user.findOne({
    where: { email },
  });

  if (!userFound) throw new Error("Invalid credentials.");

  let userPassword = await userFound.password;

  const passwordMatch = bcrypt.compare(password, userPassword);

  if (!passwordMatch) throw new Error("Invalid credentials.");

  const privateKey = process.env.JWT_PRIVATE_KEY;
  const access_token = jwt.sign({ user }, privateKey, { expiresIn: "1h" });

  res
    .header("Authorization", `Bearer ${access_token}`)
    .status(200)
    .json({ message: "LogIn successfully" });
});

module.exports = {
  signUp,
  logIn
};
