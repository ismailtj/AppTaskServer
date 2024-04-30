const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/TaskApp", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});
