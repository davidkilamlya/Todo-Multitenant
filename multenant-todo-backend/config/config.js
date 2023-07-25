const dotenv = require("dotenv").config();

module.exports = {
  mongoURI: process.env.mongoURI,
  PORT: process.env.PORT,
};
