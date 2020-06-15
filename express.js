const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/user.route");
const session = require("express-session");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//app.use("/", router);
app.use(require("./router/entrypoint"));
module.exports = app;
