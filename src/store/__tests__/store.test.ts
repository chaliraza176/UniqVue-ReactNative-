import { store } from '../index';
import {
  setCredentials,
  logout,
  updateUser,
  selectUser,
  selectIsAuthenticated,
} from '../slices/authSlice';
import {
  setEvents,
  addEvent,
  removeEvent,
  selectEvents,
} from '../slices/eventSlice';
import {
  setPhotos,
  addPhoto,
  selectPhotos,
} from '../slices/photoSlice';
import {
  setSubscription,
  selectSubscriptionPlan,
} from '../slices/subscriptionSlice';

describe('Redux Store', () => {
  describe('Store Configuration', () => {
    it('should have initial state for all slices', () => {
      const state = store.getState();
      
      expect(state.auth).toBeDefined();
      expect(state.event).toBeDefined();
      expect(state.photo).toBeDefined();
      expect(state.subscription).toBeDefined();
    });

    it('should have correct initial auth state', () => {
      const state = store.getState();
      
      expect(state.auth.user).toBeNull();
      expect(state.auth.token).toBeNull();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBeNull();
    });
  });

  describe('Auth Slice', () => {
    beforeEach(() => {
      store.dispatch(logout());
    });

    it('should set credentials', () => {
      const user = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'FREE' as const,
      };
      const token = 'test-token';

      store.dispatch(setCredentials({ user, token }));

      const state = store.getState();
      expect(selectUser(state)).toEqual(user);
      expect(selectIsAuthenticated(state)).toBe(true);
    });

    it('should logout user', () => {
      const user = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'FREE' as const,
      };
      
      store.dispatch(setCredentials({ user, token: 'token' }));
      store.dispatch(logout());

      const state = store.getState();
      expect(selectUser(state)).toBeNull();
      expect(selectIsAuthenticated(state)).toBe(false);
    });

    it('should update user', () => {
      const user = {
        _id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'FREE' as const,
      };
      
      store.dispatch(setCredentials({ user, token: 'token' }));
      store.dispatch(updateUser({ name: 'Updated Name' }));

      const state = store.getState();
      expect(selectUser(state)?.name).toBe('Updated Name');
    });
  });

  describe('Event Slice', () => {
    it('should set events', () => {
      const events = [
        {
          _id: '1',
          title: 'Event 1',
          description: 'Description',
          date: '2024-01-01',
          location: 'Location',
          createdBy: 'user1',
          qrCode: 'qr1',
          storageExpiryDate: '2024-12-31',
          createdAt: '2024-01-01',
        },
      ];

      store.dispatch(setEvents(events));

      const state = store.getState();
      expect(selectEvents(state)).toEqual(events);
    });

    it('should add event', () => {
      store.dispatch(setEvents([]));
      
      const newEvent = {
        _id: '2',
        title: 'New Event',
        description: 'Description',
        date: '2024-02-01',
        location: 'Location',
        createdBy: 'user1',
        qrCode: 'qr2',
        storageExpiryDate: '2024-12-31',
        createdAt: '2024-02-01',
      };

      store.dispatch(addEvent(newEvent));

      const state = store.getState();
      expect(selectEvents(state)).toHaveLength(1);
      expect(selectEvents(state)[0]).toEqual(newEvent);
    });

    it('should remove event', () => {
      const events = [
        {
          _id: '1',
          title: 'Event 1',
          description: 'Description',
          date: '2024-01-01',
          location: 'Location',
          createdBy: 'user1',
          qrCode: 'qr1',
          storageExpiryDate: '2024-12-31',
          createdAt: '2024-01-01',
        },
      ];

      store.dispatch(setEvents(events));
      store.dispatch(removeEvent('1'));

      const state = store.getState();
      expect(selectEvents(state)).toHaveLength(0);
    });
  });

  describe('Photo Slice', () => {
    it('should set photos', () => {
      const photos = [
        {
          _id: '1',
          eventId: 'event1',
          uploadedBy: 'user1',
          imageUrl: 'url1',
          taggedUsers: [],
          likes: 0,
          comments: [],
          isWatermarked: false,
          createdAt: '2024-01-01',
        },
      ];

      store.dispatch(setPhotos(photos));

      const state = store.getState();
      expect(selectPhotos(state)).toEqual(photos);
    });

    it('should add photo', () => {
      store.dispatch(setPhotos([]));
      
      const newPhoto = {
        _id: '2',
        eventId: 'event1',
        uploadedBy: 'user1',
        imageUrl: 'url2',
        taggedUsers: [],
        likes: 0,
        comments: [],
        isWatermarked: true,
        createdAt: '2024-01-02',
      };

      store.dispatch(addPhoto(newPhoto));

      const state = store.getState();
      expect(selectPhotos(state)).toHaveLength(1);
      expect(selectPhotos(state)[0]).toEqual(newPhoto);
    });
  });

  describe('Subscription Slice', () => {
    it('should set subscription', () => {
      const subscription = {
        _id: '1',
        userId: 'user1',
        plan: 'PREMIUM' as const,
        startDate: '2024-01-01',
        status: 'ACTIVE' as const,
      };

      store.dispatch(setSubscription(subscription));

      const state = store.getState();
      expect(selectSubscriptionPlan(state)).toBe('PREMIUM');
    });

    it('should clear subscription', () => {
      const subscription = {
        _id: '1',
        userId: 'user1',
        plan: 'PREMIUM' as const,
        startDate: '2024-01-01',
        status: 'ACTIVE' as const,
      };

      store.dispatch(setSubscription(subscription));
      store.dispatch(setSubscription(null));

      const state = store.getState();
      expect(selectSubscriptionPlan(state)).toBeUndefined();
    });
  });
});
