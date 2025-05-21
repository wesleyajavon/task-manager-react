import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import { Task, TaskStatus } from './types/Task';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/storage';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);


  const handleAddTask = () => {
    if (!newTask.trim()) return;
    if (!newDescription.trim()) return;


    const task: Task = {
      id: uuidv4(),
      title: newTask,
      description: newDescription,
      status: status,
    };

    setTasks(prev => [task, ...prev]);
    setNewTask('');
    setNewDescription('')
    setStatus('todo');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">To-Do App (TypeScript)</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Task name"
          className="border px-3 py-2 mr-2 rounded"
        />
        <input
          type="text"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description"
          className="border px-3 py-2 mr-2 rounded"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
          className="border px-2 py-2 mr-2 rounded"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default App;
