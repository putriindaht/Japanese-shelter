require("dotenv").config();
const express = require("express");
const router = require("./routers/");
const errorHandler = require("./middlewares/errorHandler");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;
