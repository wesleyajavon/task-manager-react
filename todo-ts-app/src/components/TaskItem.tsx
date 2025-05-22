import React, { useState } from 'react';
import { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEditTitle: (id: string, newTitle: string) => void;
  onEditDescription: (id: string, newDescription: string) => void;
  onEditStatus: (id: string, newStatus: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTitle, onEditDescription, onEditStatus, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTextTitle, setEditTextTitle] = useState(task.title);
  const [editTextDescription, setEditTextDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);



  const handleSave = () => {
    if (editTextTitle.trim()) {
      onEditTitle(task.id, editTextTitle);
      setIsEditing(false);
    }

    if (editTextDescription.trim()) {
      onEditDescription(task.id, editTextDescription);
      setIsEditing(false);
    }

    if (editStatus.trim()) {
      onEditStatus(task.id, editStatus);
      setIsEditing(false);
    }
  };

  return (
    <div className="border p-3 rounded mb-2 bg-white shadow-sm flex justify-between items-center">
      <div>
        {isEditing ? (
          <input
            value={editTextTitle}
            onChange={e => setEditTextTitle(e.target.value)}
            className="border px-2 py-1 mr-2 rounded"
          />
        ) : (
          <h2 className="font-semibold">{task.title}</h2>
        )}

        {isEditing ? (
          <input
            value={editTextDescription}
            onChange={e => setEditTextDescription(e.target.value)}
            className="border px-2 py-1 mr-2 rounded"
          />
        ) : (
          <h3 className="font-semibold">{task.description}</h3>
        )}

        {isEditing ? (
          <select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value as TaskStatus)}
            className="border px-2 py-2 mr-2 rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        ) : null}

        <p className="text-sm text-gray-600">Status: {task.status}</p>
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-600">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600">Edit</button>
        )}

        <button onClick={() => onDelete(task.id)} className="text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
