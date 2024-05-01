const Task = require("../model/Task");
const mongoose = require("mongoose");

exports.create = async (t, user) => {
  const task = new Task({ title: t, done: false, user });
  return await task.save();
};
exports.read = async () => {
  return await Task.find({});
};
exports.readOne = async (taskID) => {
  return await Task.findById(taskID);
};
exports.update = async (id, title, done, user) => {
  console.log("im here");
  const oldTask = await Task.findById(id);
  oldTask.title = title;
  oldTask.done = done;
  oldTask.user = new mongoose.Types.ObjectId(String(user));

  return await oldTask.save();
};

exports.supprimer = async (id) => {
  return await Task.findByIdAndDelete(id);
};
