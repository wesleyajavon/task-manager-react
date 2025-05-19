import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="border p-3 rounded mb-2 bg-white shadow-sm">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;
