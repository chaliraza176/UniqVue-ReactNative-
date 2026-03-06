import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  UploadPhotoRequest,
  PhotoResponse,
  PhotosResponse,
  GetPhotosQuery,
  LikePhotoResponse,
  CommentRequest,
  CommentResponse,
} from './types';

export const photoService = {
  /**
   * Upload a photo to an event
   */
  uploadPhoto: async (data: UploadPhotoRequest): Promise<PhotoResponse> => {
    const formData = new FormData();
    formData.append('eventId', data.eventId);
    formData.append('photo', {
      uri: data.imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    const response = await api.post<PhotoResponse>(
      API_ENDPOINTS.PHOTOS.UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Get all photos for an event
   */
  getEventPhotos: async (
    eventId: string,
    query?: GetPhotosQuery
  ): Promise<PhotosResponse> => {
    const response = await api.get<PhotosResponse>(
      API_ENDPOINTS.PHOTOS.EVENT(eventId),
      {
        params: query,
      }
    );
    return response.data;
  },

  /**
   * Like a photo
   */
  likePhoto: async (photoId: string): Promise<LikePhotoResponse> => {
    const response = await api.post<LikePhotoResponse>(
      API_ENDPOINTS.PHOTOS.LIKE(photoId)
    );
    return response.data;
  },

  /**
   * Unlike a photo
   */
  unlikePhoto: async (photoId: string): Promise<LikePhotoResponse> => {
    const response = await api.delete<LikePhotoResponse>(
      API_ENDPOINTS.PHOTOS.UNLIKE(photoId)
    );
    return response.data;
  },

  /**
   * Add a comment to a photo
   */
  commentOnPhoto: async (
    photoId: string,
    data: CommentRequest
  ): Promise<CommentResponse> => {
    const response = await api.post<CommentResponse>(
      API_ENDPOINTS.PHOTOS.COMMENT(photoId),
      data
    );
    return response.data;
  },

  /**
   * Download a photo in HD (Premium feature)
   */
  downloadPhoto: async (photoId: string): Promise<Blob> => {
    const response = await api.get<Blob>(
      API_ENDPOINTS.PHOTOS.DOWNLOAD(photoId),
      {
        responseType: 'blob',
      }
    );
    return response.data;
  },
};
