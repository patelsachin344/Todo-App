const Task = require("../Models/todo.model");

const getTask = async () => {
  const task = await Task.find();
  return task;
};

const getOneTask = async (id) => {
  const task = await Task.find({ _id: id });
  return task[0];
};

const addTask = async (body) => {
  const task = await Task.create(body);
  return task;
};

const updateTask = async (body, id) => {
  const task = await Task.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: body.status,
        taskName: body.taskName,
        priority: body.priority,
      },
    },
    { new: true }
  );
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return task;
};
module.exports = { getTask, addTask, updateTask, getOneTask, deleteTask };
