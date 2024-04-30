const Task = require("../model/Task");
const { v4: uuidv4 } = require("uuid");

exports.create = async (t) => {
  const task = new Task({ id: uuidv4(), title: t, done: false });
  return await task.save();
};
exports.read = async () => {
  return await Task.find({});
};
exports.readOne = async (task) => {
  return await Task.find({ task });
};
exports.update = async (id, title) => {
  const oldTask = await Task.findById(id);
  oldTask.title = title;
  return await Task.findByIdAndUpdate(id, oldTask);
};
exports.update = async (id, title, done) => {
  const oldTask = await Task.findById(id);
  oldTask.title = title;
  oldTask.done = done;
  return await Task.findByIdAndUpdate(id, oldTask);
};
exports.supprimer = (id) => {
  Task.findByIdAndDelete(id);
};
