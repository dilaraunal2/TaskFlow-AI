const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Route'lar
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

// ✅ Toggle tamamlandı route'u
router.patch("/:id/toggle", taskController.toggleCompleteTask);

module.exports = router;
