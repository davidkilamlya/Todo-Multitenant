const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const time = require("./middlewares/accessLogger/timeLogger");
const ip = require("./middlewares/accessLogger/ipLogger");
const connectDB = require("./config/db");
const config = require("./config/config");
const User = require("./models/UserModel");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
const PORT = config.PORT || 5001;
const HOST = "localhost";

//make a log for the request occurred to the app
let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "multitenant.log"),
  {
    flags: "a",
  }
);

morgan.token("ip", (req) => req.ip);
morgan.token("time", (req) => req.date);

app.use(time);
app.use(ip);
app.use(morgan(":time :ip :method :status :url"));
app.use(
  morgan(":time :ip :status :method :url HTTP/:http-version", {
    stream: accessLogStream,
  })
);

//  Routes
const api = config.API;
const UserRoute = require("./routes/UserRoute");
const TodoListItemRoute = require("./routes/TodoListItemRoute");
const TodoListRoute = require("./routes/TodoListRoute");
const InvitationRoute = require("./routes/InvitationRoute");
const AcceptInviteRoute = require("./routes/AcceptInviteRoute");
const CollaboratorsRoute = require("./routes/CollaboratorsRoute");

connectDB();
app.use("/api/v1/", UserRoute);
app.use("/api/v1/todo-lists/", TodoListRoute);
app.use("/api/v1/todo-lists/", TodoListItemRoute);

app.get("/", (req, res) => {
  res.send(
    `<h1> welcome to Multenant todo app we are happy to serve you here is our <a href="http://localhost:3000">app</a></h1>`
  );
});

app.listen(5001, (req, res) => {
  console.log(`app is running on http://${HOST}:${PORT}`);
});
