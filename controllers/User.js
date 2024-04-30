const User = require("../model/User");

exports.addTaskToUserByIds = async (userId, taskId) => {
  const user = await User.findById(userId);
  user.tasks.push(taskId);
  return await user.save();
};

exports.readOne = async (userId) => {
  return await User.find(userId);
};

exports.getAll = async () => {
  return await User.find({});
};
