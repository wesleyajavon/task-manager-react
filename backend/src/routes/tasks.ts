// src/routes/tasks.ts
import express from 'express';
import Task from '../models/Task';

const router = express.Router();

router.get('/', async (req, res): Promise<any> => {
  const tasks = await Task.find();
  console.log("someone tryna read tasks")
  res.json(tasks);
});

router.post('/', async (req, res): Promise<any> => {
  const newTask = new Task(req.body);
  console.log("someone tryna add tasks")

  await newTask.save();
  res.status(201).json(newTask);
});

router.put('/:id', async (req, res): Promise<any> => {
  try {
    console.log("someone tryna edit tasks")
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

router.delete('/:id', async (req, res): Promise<any> => {
  try {
    console.log("someone tryna delete tasks")
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

export default router;
