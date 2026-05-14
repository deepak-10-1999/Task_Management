export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }
  
  export type TaskStatus = 'pending' | 'in-progress' | 'completed';
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filters: {
      status: TaskStatus | 'all';
      search: string;
    };
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface ApiError {
    message: string;
    status: number;
  }