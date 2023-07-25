const mongoose = require("mongoose");
const config = require("./config");

const connDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log("Failed to connect database ", error);
  }
};

module.exports = connDB;
