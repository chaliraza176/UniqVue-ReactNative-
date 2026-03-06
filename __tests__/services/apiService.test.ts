/**
 * API Service Layer Tests
 * Tests for API service configuration and TypeScript types
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';
import { authService } from '@services/authService';
import { eventService } from '@services/eventService';
import { photoService } from '@services/photoService';
import { subscriptionService } from '@services/subscriptionService';
import { aiService } from '@services/aiService';
import { analyticsService } from '@services/analyticsService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('API Service Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Axios Instance Configuration', () => {
    it('should have correct base URL configured', () => {
      expect(api.defaults.baseURL).toBeDefined();
      expect(api.defaults.baseURL).toContain('/api/v1');
    });

    it('should have correct timeout of 30 seconds', () => {
      expect(api.defaults.timeout).toBe(30000);
    });

    it('should have correct default Content-Type header', () => {
      expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('Service Module Exports', () => {
    it('should export authService with all required methods', () => {
      expect(authService).toBeDefined();
      expect(typeof authService.register).toBe('function');
      expect(typeof authService.login).toBe('function');
      expect(typeof authService.getProfile).toBe('function');
      expect(typeof authService.logout).toBe('function');
    });

    it('should export eventService with all required methods', () => {
      expect(eventService).toBeDefined();
      expect(typeof eventService.createEvent).toBe('function');
      expect(typeof eventService.getEvents).toBe('function');
      expect(typeof eventService.getEventById).toBe('function');
      expect(typeof eventService.deleteEvent).toBe('function');
      expect(typeof eventService.rsvpToEvent).toBe('function');
      expect(typeof eventService.getEventRSVPs).toBe('function');
    });

    it('should export photoService with all required methods', () => {
      expect(photoService).toBeDefined();
      expect(typeof photoService.uploadPhoto).toBe('function');
      expect(typeof photoService.getEventPhotos).toBe('function');
      expect(typeof photoService.likePhoto).toBe('function');
      expect(typeof photoService.unlikePhoto).toBe('function');
      expect(typeof photoService.commentOnPhoto).toBe('function');
      expect(typeof photoService.downloadPhoto).toBe('function');
    });

    it('should export subscriptionService with all required methods', () => {
      expect(subscriptionService).toBeDefined();
      expect(typeof subscriptionService.createSubscription).toBe('function');
      expect(typeof subscriptionService.getSubscriptionStatus).toBe('function');
      expect(typeof subscriptionService.cancelSubscription).toBe('function');
    });

    it('should export aiService with all required methods', () => {
      expect(aiService).toBeDefined();
      expect(typeof aiService.detectFaces).toBe('function');
      expect(typeof aiService.tagPhoto).toBe('function');
    });

    it('should export analyticsService with all required methods', () => {
      expect(analyticsService).toBeDefined();
      expect(typeof analyticsService.getEventAnalytics).toBe('function');
    });
  });

  describe('Auth Service Token Management', () => {
    it('should clear token on logout', async () => {
      await authService.logout();
      
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('API Endpoint Coverage', () => {
    it('should cover all authentication endpoints', () => {
      const methods = Object.keys(authService);
      expect(methods).toEqual(['register', 'login', 'getProfile', 'logout']);
    });

    it('should cover all event endpoints including RSVP', () => {
      const methods = Object.keys(eventService);
      expect(methods).toContain('createEvent');
      expect(methods).toContain('getEvents');
      expect(methods).toContain('getEventById');
      expect(methods).toContain('deleteEvent');
      expect(methods).toContain('rsvpToEvent');
      expect(methods).toContain('getEventRSVPs');
    });

    it('should cover all photo endpoints including like/unlike', () => {
      const methods = Object.keys(photoService);
      expect(methods).toContain('uploadPhoto');
      expect(methods).toContain('getEventPhotos');
      expect(methods).toContain('likePhoto');
      expect(methods).toContain('unlikePhoto');
      expect(methods).toContain('commentOnPhoto');
      expect(methods).toContain('downloadPhoto');
    });

    it('should cover all subscription endpoints including cancel', () => {
      const methods = Object.keys(subscriptionService);
      expect(methods).toContain('createSubscription');
      expect(methods).toContain('getSubscriptionStatus');
      expect(methods).toContain('cancelSubscription');
    });

    it('should cover AI endpoints for face detection and tagging', () => {
      const methods = Object.keys(aiService);
      expect(methods).toContain('detectFaces');
      expect(methods).toContain('tagPhoto');
    });

    it('should cover analytics endpoints for business tier', () => {
      const methods = Object.keys(analyticsService);
      expect(methods).toContain('getEventAnalytics');
    });
  });
});
