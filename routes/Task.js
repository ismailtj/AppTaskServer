const taskController = require("../controllers/Task");
const userController = require("../controllers/User");
const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const taskList = await taskController.read();
    res.status(200).json({ message: "Protected route accessed", taskList });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, assignedToId } = req.body;
    const newTask = await taskController.create(title);
    console.log(newTask);
    await userController.addTaskToUserByIds(
      assignedToId,
      newTask._id.toString()
    );
    res.status(200).json({ message: "task Created" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    taskController.update(id, title);
    res.status(200).json({ message: "task updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  try {
    taskController.delete(id);
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
