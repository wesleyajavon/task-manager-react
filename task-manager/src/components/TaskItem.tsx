import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';

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

  const getStatusColor = (status: string): string => {
  switch (status) {
    case "To do":
      return "bg-gray-100";
    case "In progress":
      return "bg-yellow-100";
    case "Done":
      return "bg-green-100";
    default:
      return "bg-white";
  }
};

  return (
    <div className={`border p-3 rounded mb-2 shadow-sm flex justify-between items-center ${getStatusColor(task.status)}`}>
      <div>
        {isEditing ? (
          <input
            value={editTextTitle}
            onChange={e => setEditTextTitle(e.target.value)}
            className="border px-2 py-1 mr-2 rounded"
          />
        ) : (
          <h1 className="font-bold">{task.title}</h1>
        )}

        {isEditing ? (
          <input
            value={editTextDescription}
            onChange={e => setEditTextDescription(e.target.value)}
            className="border px-2 py-1 mr-2 rounded"
          />
        ) : (
          <h5>{task.description}</h5>
        )}

        {isEditing ? (
          <select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value as TaskStatus)}
            className="border px-2 py-2 mr-2 mt-2 rounded"
          >
            <option value="To do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        ) : <p className="text-sm text-gray-600">Status: {task.status}</p>
        }

      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-600 shadow-md hover:bg-green-100 transition-all duration-200 cursor-pointer">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600 shadow-md hover:bg-blue-100 transition-all duration-200 cursor-pointer focus:outline-none focus:ring">Edit</button>
        )}

        <button onClick={() => onDelete(task.id)} className="text-red-600 shadow-md hover:bg-red-100 transition-all duration-200 cursor-pointer">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
