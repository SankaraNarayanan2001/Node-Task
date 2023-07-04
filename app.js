const express = require("express");

const appError = require("./app/utils/appError");

const errorController = require("./app/controllers/errorcontroller");

const adminrouter = require("./app/routes/adminRoutes");

const userrouter = require("./app/routes/userRoutes");
const PORT = process.env.DB_PORT;

const app = express();

app.use(express.json());

app.use(adminrouter);

app.use(userrouter);

app.all("*", (req, res, next) => {
  const err = new appError(404, `can't find ${req.originalUrl} on the server`);
  next(err);
});

app.use(errorController);

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
