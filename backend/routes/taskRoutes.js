const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware.js");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controller/taskController.js");
router.use(auth);
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
