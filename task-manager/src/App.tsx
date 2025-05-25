import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import type { Task, TaskStatus } from './types/Task';
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

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const handleEditTaskDescription = (id: string, newDescription: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, description: newDescription } : task))
    );
  };

  const handleEditTaskStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Task Manager 📝(TypeScript)</h1>

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
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEditTitle={handleEditTask}
              onEditDescription={handleEditTaskDescription}
              onEditStatus={handleEditTaskStatus}
              onDelete={handleDeleteTask}
            />
          ))
        )}

      </div>
    </div>

  );
};

export default App;
