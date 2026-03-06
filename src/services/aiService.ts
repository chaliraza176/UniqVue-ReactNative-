import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  DetectFacesRequest,
  DetectFacesResponse,
  TagPhotoRequest,
  PhotoResponse,
} from './types';

export const aiService = {
  /**
   * Detect faces in a photo (internal service call)
   * Note: This is typically called by the backend after photo upload
   */
  detectFaces: async (
    data: DetectFacesRequest
  ): Promise<DetectFacesResponse> => {
    const response = await api.post<DetectFacesResponse>(
      API_ENDPOINTS.AI.DETECT_FACES,
      data
    );
    return response.data;
  },

  /**
   * Manually tag a user in a photo
   */
  tagPhoto: async (data: TagPhotoRequest): Promise<PhotoResponse> => {
    const response = await api.post<PhotoResponse>(
      API_ENDPOINTS.AI.TAG_PHOTO,
      data
    );
    return response.data;
  },
};
