const mongoose = require("mongoose");

const connectdb = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "chatapp",
    });
    console.log(`Databse is connected on port ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
