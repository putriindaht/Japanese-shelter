require("dotenv").config();
const Redis = require("ioredis");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const routers = require("./routers/index");

const app = express();
const port = process.env.PORT || 10000;

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(routers);

app.listen(port, () => {
  console.log(`App listen at port ${port}`);
});
