const task = require("../models/task");
const Task = require("../models/task");
exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user,
  });

  res.json(task);
};
exports.getTasks = async (req, res) => {
  const tasks = await task.find({ createdBy: req.user });
  res.json(tasks);
};
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
