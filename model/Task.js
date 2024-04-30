const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, unique: true, required: true },
  done: { type: Boolean },
});

module.exports = mongoose.model("Task", taskSchema);
