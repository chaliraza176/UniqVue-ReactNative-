/**
 * Navigation Module Exports
 * Central export point for all navigation-related functionality
 */

// Navigators
export { default as AppNavigator } from './AppNavigator';
export { default as AuthNavigator } from './AuthNavigator';
export { default as MainNavigator } from './MainNavigator';

// Types
export type {
  RootStackParamList,
  AuthStackParamList,
  MainStackParamList,
  TabParamList,
  LoginScreenProps,
  RegisterScreenProps,
  HomeScreenProps,
  ProfileScreenProps,
  CreateEventScreenProps,
  EventDetailScreenProps,
  PhotoGalleryScreenProps,
  PhotoViewerScreenProps,
  QRScannerScreenProps,
  SubscriptionScreenProps,
  AuthStackNavigationProp,
  MainStackNavigationProp,
  TabNavigationProp,
} from './types';

// Hooks
export { useAuthNavigation, useMainNavigation, useTabNavigation } from './hooks';
