require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4001;
const routers = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const { mongoConnection } = require("./config/mongoConnection");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routers);
app.use(errorHandler);

mongoConnection().then((db) => {
  app.listen(port, () => console.log(`Apps is listening at port ${port}`));
});
