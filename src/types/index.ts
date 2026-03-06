/**
 * Core Type Definitions
 * Shared types used throughout the application
 */

import type {
  SubscriptionTier,
  SubscriptionStatus,
  RSVPStatus,
  FaceDetectionStatus,
} from '@config/constants';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  instagramLink?: string;
  role: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  subscriptionEndDate?: Date;
  createdAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: string;
  qrCode: string;
  storageExpiryDate: Date;
  photoCount: number;
  rsvpCount: number;
  isExpired: boolean;
  createdAt: Date;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  status: RSVPStatus;
  createdAt: Date;
}

// Photo Types
export interface Photo {
  id: string;
  eventId: string;
  imageUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  taggedUsers: string[];
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  isWatermarked: boolean;
  faceDetectionStatus: FaceDetectionStatus;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionTier;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: SubscriptionStatus;
  startDate?: Date;
  endDate?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
}

// Analytics Types
export interface EventAnalytics {
  eventId: string;
  totalAttendees: number;
  totalPhotos: number;
  totalLikes: number;
  totalComments: number;
  engagementRate: number;
  rsvpAcceptanceRate: number;
  uploadTimeline: TimelineData[];
  topContributors: Contributor[];
}

export interface TimelineData {
  date: string;
  photoCount: number;
}

export interface Contributor {
  userId: string;
  userName: string;
  photoCount: number;
}

// QR Scanner Types
export interface QRScanResult {
  eventId: string;
  type: 'event';
}

// API Response Types
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
