const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env",
});

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
