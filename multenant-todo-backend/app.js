const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const time = require("./middlewares/accessLogger/timeLogger");
const ip = require("./middlewares/accessLogger/ipLogger");
const connectDB = require("./config/db");
const config = require("./config/config");
const cookieParser = require("cookie-parser");


// Enable CORS for specific origin (http://localhost:3000 in this case)
const corsOptions = {
  origin: "multitenanttodowithdavid.azurewebsites.net",
  credentials: true, // Set this to 'true' to allow sending cookies in cross-origin requests
};

const app = express();
app.use(express.static("./build"))
require("dotenv").config();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Use cookie-parser middleware
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
const checkAuth = require("./routes/CheckAuth");

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"build","index.html"))
});
connectDB();
app.use("/api/v1/", UserRoute);
app.use("/api/v1/todo-lists/", TodoListRoute);
app.use("/api/v1/todo-lists/", TodoListItemRoute);
app.use("/api/v1/todo-lists/", InvitationRoute);
app.use("/api/v1/todo-lists/", CollaboratorsRoute);
app.use("/api/v1/accept-invite/", AcceptInviteRoute);
app.use("/api/v1/checkAuth/", checkAuth);

app.get("/", (req, res) => {
  res.send(
    `<h1> welcome to Multenant todo app we are happy to serve you here is our <a href="http://localhost:3000">app</a></h1>`
  );
});

app.listen(5001, (req, res) => {
  console.log(`app is running on http://${HOST}:${PORT}`);
});
