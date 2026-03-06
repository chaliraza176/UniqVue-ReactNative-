/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.uniqvue.com/api/v1';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  // Users
  USERS: {
    UPDATE: '/users/update',
    INSTAGRAM: '/users/instagram',
  },
  // Events
  EVENTS: {
    CREATE: '/events/create',
    LIST: '/events',
    DETAIL: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
    RSVP: (id: string) => `/events/${id}/rsvp`,
    RSVPS: (id: string) => `/events/${id}/rsvps`,
  },
  // Photos
  PHOTOS: {
    UPLOAD: '/photos/upload',
    EVENT: (eventId: string) => `/photos/event/${eventId}`,
    LIKE: (id: string) => `/photos/${id}/like`,
    UNLIKE: (id: string) => `/photos/${id}/like`,
    COMMENT: (id: string) => `/photos/${id}/comment`,
    DOWNLOAD: (id: string) => `/photos/${id}/download`,
  },
  // AI
  AI: {
    DETECT_FACES: '/ai/detect-faces',
    TAG_PHOTO: '/ai/tag-photo',
  },
  // Subscription
  SUBSCRIPTION: {
    CREATE: '/subscription/create',
    WEBHOOK: '/subscription/webhook',
    STATUS: '/subscription/status',
    CANCEL: '/subscription/cancel',
  },
  // Analytics
  ANALYTICS: {
    EVENT: (eventId: string) => `/analytics/event/${eventId}`,
  },
};
