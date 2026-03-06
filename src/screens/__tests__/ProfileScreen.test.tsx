import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProfileScreen } from '../ProfileScreen';
import authReducer from '../../store/slices/authSlice';
import subscriptionReducer from '../../store/slices/subscriptionSlice';

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('ProfileScreen', () => {
  const mockStore = configureStore({
    reducer: {
      auth: authReducer,
      subscription: subscriptionReducer,
    },
    preloadedState: {
      auth: {
        user: {
          _id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'FREE',
        },
        token: 'mock-token',
        isAuthenticated: true,
        loading: false,
        error: null,
      },
      subscription: {
        subscription: {
          _id: 'sub123',
          userId: '123',
          plan: 'FREE',
          status: 'ACTIVE',
          startDate: new Date().toISOString(),
          cancelAtPeriodEnd: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        loading: false,
        error: null,
      },
    },
  });

  it('renders correctly with user data', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProfileScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByText('Subscription')).toBeTruthy();
    expect(getByText('Instagram')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('displays upgrade button for FREE users', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProfileScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Upgrade Plan')).toBeTruthy();
  });

  it('displays subscription status correctly', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProfileScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Active')).toBeTruthy();
    expect(getByText('FREE')).toBeTruthy();
  });
});
