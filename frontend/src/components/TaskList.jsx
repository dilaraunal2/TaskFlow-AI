// src/components/TaskList.jsx
import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const getColor = (priority) => {
    switch (priority) {
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "";
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`task-item ${getColor(task.priority)} ${task.completed ? "completed" : ""}`}
        >
          <div className="task-info">
            <strong>{task.title}</strong> <br />
            {task.description} <br />
            <span className="priority-text">Priority: {task.priority}</span>
          </div>
          <div className="task-actions">
            <button
              className={`check-btn ${task.completed ? "checked" : ""}`}
              onClick={() => onToggle(task._id)}
            >
              ✔️
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(task._id)}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
