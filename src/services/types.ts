/**
 * API Service Types
 * TypeScript interfaces for all API requests and responses
 */

// ============================================================================
// Common Types
// ============================================================================

export type UserRole = 'FREE' | 'PREMIUM' | 'BUSINESS';
export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PAST_DUE';
export type RSVPStatus = 'ACCEPTED' | 'DECLINED';
export type FaceDetectionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

// ============================================================================
// User Types
// ============================================================================

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  instagramLink?: string;
  role: UserRole;
  subscriptionStatus?: SubscriptionStatus;
  createdAt: string;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ProfileResponse {
  user: User;
}

// ============================================================================
// User Service Types
// ============================================================================

export interface UpdateProfileRequest {
  name?: string;
  profileImage?: string;
}

export interface UpdateInstagramRequest {
  instagramLink: string;
}

export interface UserResponse {
  user: User;
}

// ============================================================================
// Event Types
// ============================================================================

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  qrCode: string;
  storageExpiryDate: string;
  isExpired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface EventResponse {
  event: Event;
}

export interface EventsResponse {
  events: Event[];
}

export interface DeleteEventResponse {
  success: boolean;
  message: string;
}

export interface GetEventsQuery {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================================================
// RSVP Types
// ============================================================================

export interface RSVP {
  _id: string;
  eventId: string;
  userId: string;
  status: RSVPStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRSVPRequest {
  status: RSVPStatus;
}

export interface RSVPResponse {
  rsvp: RSVP;
}

export interface RSVPsResponse {
  rsvps: RSVP[];
}

// ============================================================================
// Photo Types
// ============================================================================

export interface Comment {
  _id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface Photo {
  _id: string;
  eventId: string;
  uploadedBy: {
    _id: string;
    name: string;
  };
  imageUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;
  taggedUsers: string[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  isWatermarked: boolean;
  faceDetectionStatus: FaceDetectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UploadPhotoRequest {
  eventId: string;
  imageUri: string;
}

export interface PhotoResponse {
  photo: Photo;
}

export interface PhotosResponse {
  photos: Photo[];
}

export interface GetPhotosQuery {
  taggedUserId?: string;
}

export interface LikePhotoResponse {
  likes: number;
  isLiked: boolean;
}

export interface CommentRequest {
  text: string;
}

export interface CommentResponse {
  comment: Comment;
}

// ============================================================================
// AI Types
// ============================================================================

export interface DetectedFace {
  boundingBox: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  confidence: number;
  matchedUserId?: string;
}

export interface DetectFacesRequest {
  photoId: string;
  imageUrl: string;
}

export interface DetectFacesResponse {
  faces: DetectedFace[];
}

export interface TagPhotoRequest {
  photoId: string;
  userId: string;
}

// ============================================================================
// Subscription Types
// ============================================================================

export interface Subscription {
  _id: string;
  userId: string;
  plan: UserRole;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: SubscriptionStatus;
  startDate?: string;
  endDate?: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionRequest {
  plan: 'PREMIUM' | 'BUSINESS';
}

export interface CreateSubscriptionResponse {
  checkoutUrl: string;
}

export interface SubscriptionStatusResponse {
  subscription: Subscription;
}

export interface CancelSubscriptionResponse {
  subscription: Subscription;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface TimelineData {
  date: string;
  photoCount: number;
}

export interface Contributor {
  userId: string;
  userName: string;
  photoCount: number;
}

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

export interface AnalyticsResponse {
  analytics: EventAnalytics;
}

// ============================================================================
// Error Types
// ============================================================================

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
