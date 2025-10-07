function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <strong>{task.title}</strong>: {task.description}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
