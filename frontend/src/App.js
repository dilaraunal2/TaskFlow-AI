import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Backend’den görevleri çek
  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Veri alınamadı:", err));
  }, []);

  // Yeni görev ekleme
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

  return (
    <div>
      <h1>Görev Listesi</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
