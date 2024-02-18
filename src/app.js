const express = require("express");
require("dotenv/config");
const cors = require("cors");
const AuthRoute = require("./users/route.js");
const EventRoute = require("./events/routes.js");
const { globalErrorHandler } = require("../utils");
const { authenticationMiddleWare } = require("../middlewares");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.use("/api", AuthRoute);

app.use(authenticationMiddleWare);
app.use("/api/events", EventRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
