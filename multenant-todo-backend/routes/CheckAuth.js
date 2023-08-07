const express = require("express");
const { checkAuth } = require("../controllers/checkAuth");
const jwtService = require("../services/JwtService");

const Router = express.Router();

Router.get("/", jwtService.verifyToken, checkAuth);

module.exports = Router;
