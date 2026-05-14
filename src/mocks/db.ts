import { Task, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const mockUser: User = {
  id: '1',
  username: 'test',
  email: 'test@example.com',
};

export let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task management app including setup guide and API documentation',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  },
  {
    id: '2',
    title: 'Implement dark mode',
    description: 'Add dark mode toggle and theme switching functionality',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  },
  {
    id: '3',
    title: 'Write unit tests',
    description: 'Achieve 100% code coverage with comprehensive unit tests',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  },
];

export const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Task => {
  const newTask: Task = {
    ...task,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
  };
  mockTasks.unshift(newTask);
  return newTask;
};

export const updateTaskById = (id: string, updates: Partial<Task>): Task | null => {
  const index = mockTasks.findIndex(task => task.id === id);
  if (index !== -1) {
    mockTasks[index] = {
      ...mockTasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return mockTasks[index];
  }
  return null;
};

export const deleteTaskById = (id: string): boolean => {
  const initialLength = mockTasks.length;
  mockTasks = mockTasks.filter(task => task.id !== id);
  return mockTasks.length !== initialLength;
};