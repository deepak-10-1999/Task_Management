// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { mockUser, mockTasks, addTask, updateTaskById, deleteTaskById } from './db';

const generateToken = (userId: string): string => {
  return btoa(JSON.stringify({ userId, exp: Date.now() + 3600000 }));
};

export const handlers = [
  // Login endpoint - match exact URL
  http.post('/login', async ({ request }) => {
    console.log('MSW: Intercepting POST /login');
    await delay(500);
    
    try {
      const { username, password } = await request.json() as any;
      
      if (username === 'test' && password === 'test123') {
        const token = generateToken(mockUser.id);
        console.log('MSW: Login successful');
        return HttpResponse.json({
          token,
          user: mockUser,
        });
      }
      
      console.log('MSW: Login failed - invalid credentials');
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    } catch (error) {
      console.error('MSW: Login error', error);
      return HttpResponse.json(
        { message: 'Invalid request' },
        { status: 400 }
      );
    }
  }),

  // Get all tasks
  http.get('/tasks', async ({ request }) => {
    console.log('MSW: Intercepting GET /tasks');
    await delay(300);
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('MSW: Unauthorized - no token');
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log('MSW: Returning tasks', mockTasks.length);
    return HttpResponse.json(mockTasks);
  }),

  // Create task
  http.post('/tasks', async ({ request }) => {
    console.log('MSW: Intercepting POST /tasks');
    await delay(500);
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const taskData = await request.json() as any;
    const newTask = addTask(taskData);
    console.log('MSW: Task created', newTask.id);
    
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update task
  http.put('/tasks/:id', async ({ params, request }) => {
    console.log('MSW: Intercepting PUT /tasks/:id');
    await delay(400);
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const updates = await request.json() as any;
    const updatedTask = updateTaskById(id as string, updates);
    
    if (!updatedTask) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    console.log('MSW: Task updated', id);
    return HttpResponse.json(updatedTask);
  }),

  // Delete task
  http.delete('/tasks/:id', async ({ params, request }) => {
    console.log('MSW: Intercepting DELETE /tasks/:id');
    await delay(300);
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const deleted = deleteTaskById(id as string);
    
    if (!deleted) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    console.log('MSW: Task deleted', id);
    return new HttpResponse(null, { status: 204 });
  }),
];