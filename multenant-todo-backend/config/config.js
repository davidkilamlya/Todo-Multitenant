const dotenv = require("dotenv").config();

module.exports = {
  mongoURI: process.env.mongoURI,
  PORT: process.env.PORT,
  secret_key: process.env.secret,
  API: process.env.API,
  mailUser: process.env.mailUser,
  mailPass: process.env.mailPass,
  invite_secret: process.env.invite_secret,
};
