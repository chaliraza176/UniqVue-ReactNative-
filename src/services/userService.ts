import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  UpdateProfileRequest,
  UpdateInstagramRequest,
  UserResponse,
} from './types';

export const userService = {
  /**
   * Update user profile information
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(
      API_ENDPOINTS.USERS.UPDATE,
      data
    );
    return response.data;
  },

  /**
   * Update user Instagram link
   */
  updateInstagram: async (
    data: UpdateInstagramRequest
  ): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(
      API_ENDPOINTS.USERS.INSTAGRAM,
      data
    );
    return response.data;
  },
};
