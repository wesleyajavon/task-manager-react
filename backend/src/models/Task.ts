// src/models/Task.ts
import mongoose from 'mongoose';
import { Task, TaskStatus } from '../../../task-manager/src/types/Task';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['To do', 'In progress', 'Done'],
    default: 'To do',
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt

export default mongoose.model('Task', taskSchema);
