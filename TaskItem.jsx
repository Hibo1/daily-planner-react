function TaskItem({
  task,
  index,
  onDelete,
  onMoveUp,
  onMoveDown,
  onToggleCompleted,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompleted(index)}
      />

      <span className={`text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>

      {/* 👇 this will ALWAYS show something */}
      <span className="time">{task.time || 'No time'}</span>

      <button className="delete-button" onClick={() => onDelete(index)}>
        Delete
      </button>

      <button className="move-button" onClick={() => onMoveUp(index)}>
        ↑
      </button>

      <button className="move-button" onClick={() => onMoveDown(index)}>
        ↓
      </button>
    </li>
  );
}

export default TaskItem;
