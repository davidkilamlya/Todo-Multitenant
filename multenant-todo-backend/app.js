const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const time = require("./middlewares/accessLogger/timeLogger");
const ip = require("./middlewares/accessLogger/ipLogger");
const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "localhost";

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "multenant.log"),
  {
    flags: "a",
  }
);

morgan.token("ip", (req) => req.ip);
morgan.token("time", (req) => req.date);

// app.use(assignId);
app.use(time);
app.use(ip);
app.use(morgan(":time :ip :method :status :url"));
app.use(
  morgan(":time :ip :status :method :url HTTP/:http-version", {
    stream: accessLogStream,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send(
    `<h1> welcome to Multenant todo app we are happy to serve you here is our <a href="http://localhost:3000">app</a></h1>`
  );
});

app.listen(PORT, (req) => {
  console.log(`app is running on http://${HOST}:${PORT}`);
});
