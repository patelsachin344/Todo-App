const Task = require("../Models/todo.model");

const getTask = async (sortStatus, sortPriority) => {
  let task;
  if (sortStatus && sortPriority) {
    task = await Task.find({ status: sortStatus, priority: sortPriority });
  } else if (sortStatus) {
    task = await Task.find({ status: sortStatus });
  } else if (sortPriority) {
    task = await Task.find({ priority: sortPriority });
  } else {
    task = await Task.find();
    console.log("No query");
  }
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

const filterTask = async (filter) => {
  const task = await Task.find({ status: filter });
  return task;
};

module.exports = {
  getTask,
  addTask,
  updateTask,
  getOneTask,
  deleteTask,
  filterTask,
};
