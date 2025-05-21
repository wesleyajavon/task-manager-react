import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="border p-3 rounded mb-2 bg-white shadow-sm">
      <h2 className="font-semibold">{task.title}</h2>
      <h4 className="font-semibold">{task.description}</h4>
      <p className="text-sm text-gray-600">Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;
