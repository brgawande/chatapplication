const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
dotenv.config({
  path: "./config/config.env",
});

const app = express();

connectdb();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
