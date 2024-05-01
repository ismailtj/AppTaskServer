const userController = require("../controllers/User");
const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const userList = await userController.getAll();
    res.status(200).json({ message: "Protected route accessed", userList });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userController.readOne(id);
    res.status(200).json({ message: "Protected route accessed", user });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
