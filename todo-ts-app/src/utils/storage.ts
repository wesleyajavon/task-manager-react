import { Task } from '../types/Task';

const STORAGE_KEY = 'todo_tasks';

export function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasksFromStorage(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
}
