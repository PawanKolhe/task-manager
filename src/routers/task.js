const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");
const { findOne } = require("../models/task");

// Create Task
router.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate('tasks').execPopulate();
    // res.send(tasks);
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Read Task
router.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Update Task
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
