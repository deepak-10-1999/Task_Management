export const API_ENDPOINTS = {
    LOGIN: '/login',
    TASKS: '/tasks',
  } as const;
  
  export const TASK_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
  } as const;
  
  export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    DARK_MODE: 'darkMode',
  } as const;
  
  export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    NOT_FOUND: '/404',
  } as const;