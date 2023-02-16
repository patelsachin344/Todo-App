const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connect = async () => {
  return new Promise((res, rej) => {
    mongoose.connect("mongodb://127.0.0.1:27017/TodoApp", (err) => {
      if (err) {
        console.error(err);
        rej();
      }
    });
    console.log("Connected to database");
    res();
  });
};

module.exports = connect;
