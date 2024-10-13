const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
dotenv.config({
  path: "./config/config.env",
});

const app = express();

connectdb();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${process.env.PORT}`);
});
