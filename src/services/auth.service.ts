// src/services/auth.service.ts
import api from './api';
import { LoginCredentials, LoginResponse } from '../types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/login', credentials);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export default new AuthService();