// src/types/Task.ts
export type TaskStatus = 'To do' | 'In progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
