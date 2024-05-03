const taskController = require("../controllers/Task");
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
    const { title, user } = req.body;
    await taskController.create(title, user);
    res.status(200).json({ message: "task Created" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskController.readOne(id);
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, done, user } = req.body;
  console.log("editing task");
  try {
    taskController.update(id, title, done, user);
    res.status(200).json({ message: "task updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  try {
    taskController.supprimer(id);
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
