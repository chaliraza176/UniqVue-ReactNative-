import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  ProfileResponse,
} from './types';

export const authService = {
  /**
   * Register a new user account
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    await AsyncStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  /**
   * Login with email and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    await AsyncStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  /**
   * Logout and clear stored token
   */
  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('authToken');
  },
};
