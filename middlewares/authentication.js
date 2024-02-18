const jwt = require("jsonwebtoken");
const { asyncWrapper } = require("../utils");

module.exports = asyncWrapper(async (req, res, next) => {
  let authHeader = req.header("authorization")

  let access_token = authHeader.split(" ")[1];

  if(!access_token) return next("Could not parse access token");

  let decoded = jwt.verify(access_token, process.env.JWT_PRIVATE_KEY);

  req.user = decoded.user;

  next();
});


