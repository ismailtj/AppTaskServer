const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  admin: { type: Boolean, required: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});
module.exports = mongoose.model("User", userSchema);
