const express = require("express");
const app = express();
const authRoutes = require("./routes/Auth");
const taskRoutes = require("./routes/Task");
const userRoutes = require("./routes/User");
require("./middleware/db");

app.use(express.json());
app.get("/", function (req, res) {
  console.log("Root Route");
  res.json({ message: "hello world" });
});
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log("Server runing ...");
});
