/**
 * Application Constants
 * Shared constants used throughout the application
 */

export const SUBSCRIPTION_TIERS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  BUSINESS: 'BUSINESS',
} as const;

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  PAST_DUE: 'PAST_DUE',
} as const;

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];

export const RSVP_STATUS = {
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
} as const;

export type RSVPStatus = typeof RSVP_STATUS[keyof typeof RSVP_STATUS];

export const FACE_DETECTION_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type FaceDetectionStatus = typeof FACE_DETECTION_STATUS[keyof typeof FACE_DETECTION_STATUS];

export const IMAGE_FORMATS = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  HEIC: 'image/heic',
} as const;

export const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB

export const FREE_TIER_LIMITS = {
  EVENTS_PER_MONTH: 1,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@uniqvue:auth_token',
  USER_DATA: '@uniqvue:user_data',
};
