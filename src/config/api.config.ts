// src/config/api.config.ts
export const API_CONFIG = {
    baseURL: '',
    timeout: 30000,
  };
  
  // For MSW to work properly, we need to ensure we're not using a full URL
  // when in development mode with MSW enabled
  export const isUsingMSW = process.env.NODE_ENV === 'development';