const express = require('express');
require("dotenv/config");
const  cors = require('cors');
const  AuthRoute = require('./users/route.js');
const { globalErrorHandler } = require("../utils");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use('/auth', AuthRoute);


app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});