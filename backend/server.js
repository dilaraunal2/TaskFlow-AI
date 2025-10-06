const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config(); // .env dosyasını yükle

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('Connection error:', err));

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new task
app.post('/tasks', async (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority required" });
  }

  try {
    const task = new Task({ title, description, priority });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
