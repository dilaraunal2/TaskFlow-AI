const Task = require("../models/task");

// Görevleri listele
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tek görev getir
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Yeni görev oluştur
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description) return res.status(400).json({ error: "title ve description gerekli" });

    const task = new Task({ title, description, priority: priority || "low" });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Görev güncelle
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.priority = priority ?? task.priority;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Görev sil
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
