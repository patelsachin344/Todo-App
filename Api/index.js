const express = require("express");
const connect = require("./Db/connect");
const cors = require("cors");
const router = require("./Router/todo.router");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

const port = 5000;
connect().then(() =>
  app.listen(port, (err) => {
    if (err) {
      return console.log("connecting to server failed");
    }
    console.log("server listening on port " + port);
  })
);
