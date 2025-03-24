console.log("✅ TaskManager Loaded!"); // Debugging log

import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // Clear input after adding
    }
  };

  // Toggle completion of a task
  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">✅ Task Manager</h2>

      <p className="text-gray-500 text-center mb-4">
        Add, complete, or remove tasks quickly.
      </p>

      {/* Task Input */}
      <div className="flex mb-4">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet.</p>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`p-2 border rounded flex justify-between items-center cursor-pointer ${
                task.completed ? "line-through text-gray-400" : "text-black"
              }`}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent marking complete when deleting
                  removeTask(index);
                }}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}