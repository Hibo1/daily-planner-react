import { useState } from 'react';
import TaskItem from './TaskItem';

function ToDoList() {
  const [tasks, setTasks] = useState([]); // each task = { text, time, completed }
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    console.log('newTime when adding:', newTime);
    if (newTask.trim() !== '') {
      const newTaskObj = {
        text: newTask,
        time: newTime, // 👈 store time coming from the input
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask('');
      setNewTime(''); // 👈 clear time input
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function toggleTaskCompleted(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />

        <input
          type="text"
          placeholder="Time (e.g. 09:30 PM)"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />

        <button
          className="add-button"
          onClick={addTask}
          disabled={newTask.trim() === ''}
        >
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            onDelete={deleteTask}
            onMoveUp={moveTaskUp}
            onMoveDown={moveTaskDown}
            onToggleCompleted={toggleTaskCompleted}
          />
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
