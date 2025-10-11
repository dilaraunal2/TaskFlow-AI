import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Veri alınamadı:", err));
  }, []);

  const addTask = async ({ title, description }) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Görev eklenemedi");
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Görev silinemedi");
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id) => {
  try {
    const res = await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" });
    if (!res.ok) throw new Error("Görev güncellenemedi");
    const updatedTask = await res.json();
    setTasks(prevTasks => prevTasks.map(t => t._id === id ? updatedTask : t));
  } catch (err) {
    console.error(err);
  }
};


  return (
  <div className="app-container">
    <div className="app-card">
      <h1 className="app-title">📝 My Task Manager</h1>
      <p className="subtitle">Tüm görevlerini tek bir yerden takip et!</p>
      <AddTaskForm onAdd={addTask} />
      <TaskList 
        tasks={tasks} 
        onDelete={deleteTask} 
        onToggle={toggleComplete} 
      />
    </div>
  </div>
);
}

export default App;
