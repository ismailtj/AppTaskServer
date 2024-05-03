const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const authRoutes = require("./routes/Auth");
const taskRoutes = require("./routes/Task");
const userRoutes = require("./routes/User");
require("./middleware/db");

// Define the CORS options
// const corsOptions = {
//   credentials: true,
//   origin: ["http://localhost:3000", "http://localhost:80", "*"], // Whitelist the domains you want to allow
// };
app.use(cors()); // Use the cors middleware with your options
app.use(express.json());
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Root Route");
  res.json({ message: "hello world" });
});
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log("Server runing ...");
});
