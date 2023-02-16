const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
  getOneTask,
  deleteTask,
} = require("../Controller/todo.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const task = await getTask();
    res.status(200).send({
      task: task,
      message: "Successfully get tasks",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const task = await getOneTask(id);
    if (task) {
      res.status(200).send({
        task,
        message: "successfully get task",
      });
    } else {
      res.status(400).send({
        message: "Provide valid task id",
      });
    }
  } catch (error) {
    res.status(401).send({
      error: error.message,
    });
  }
});

//  Create a new task
router.post("/", async (req, res) => {
  try {
    let body = req.body;
    const task = await addTask(body);
    if (task) {
      res.status(200).send({
        task: task,
        message: "successfully added task",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// Update tasks
router.patch("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    const task = await updateTask(body, id);

    if (task) {
      res.status(200).send({
        task: task,
        message: "successfully updated task",
      });
    } else {
      res.status(400).send({
        message: "Provide valid task id",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const task = await deleteTask(id);

    if (task) {
      res.status(200).send({
        task,
        message: "Task deleted successfully",
      });
    } else {
      res.status(400).send({
        message: "Provide valid task id",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;
