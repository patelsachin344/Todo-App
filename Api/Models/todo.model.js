const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Task = mongoose.model("task", TodoSchema);

module.exports = Task;
