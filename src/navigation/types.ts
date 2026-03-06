/**
 * Navigation Type Definitions
 * Centralized type-safe navigation types for the entire app
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

/**
 * Root Navigator Param List
 * Top-level navigator that switches between Auth and Main flows
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

/**
 * Authentication Stack Param List
 * Screens available before user authentication
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * Main Tab Navigator Param List
 * Bottom tab screens available after authentication
 */
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

/**
 * Main Stack Param List
 * All screens available after authentication, including modals
 */
export type MainStackParamList = {
  HomeTabs: NavigatorScreenParams<TabParamList>;
  CreateEvent: undefined;
  EventDetail: { eventId: string };
  PhotoGallery: { eventId: string };
  PhotoViewer: { photoId: string; eventId: string };
  QRScanner: undefined;
  Subscription: undefined;
  Settings: undefined;
};

/**
 * Screen Props Type Helpers
 * Use these types in screen components for type-safe navigation and route params
 */

// Auth Stack Screen Props
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// Tab Screen Props
export type HomeScreenProps = BottomTabScreenProps<TabParamList, 'Home'>;
export type ProfileScreenProps = BottomTabScreenProps<TabParamList, 'Profile'>;

// Main Stack Screen Props
export type CreateEventScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateEvent'>;
export type EventDetailScreenProps = NativeStackScreenProps<MainStackParamList, 'EventDetail'>;
export type PhotoGalleryScreenProps = NativeStackScreenProps<MainStackParamList, 'PhotoGallery'>;
export type PhotoViewerScreenProps = NativeStackScreenProps<MainStackParamList, 'PhotoViewer'>;
export type QRScannerScreenProps = NativeStackScreenProps<MainStackParamList, 'QRScanner'>;
export type SubscriptionScreenProps = NativeStackScreenProps<MainStackParamList, 'Subscription'>;
export type SettingsScreenProps = NativeStackScreenProps<MainStackParamList, 'Settings'>;

/**
 * Navigation Prop Type Helpers
 * Use these when you only need the navigation prop (not route)
 */
export type AuthStackNavigationProp = NativeStackScreenProps<AuthStackParamList>['navigation'];
export type MainStackNavigationProp = NativeStackScreenProps<MainStackParamList>['navigation'];
export type TabNavigationProp = BottomTabScreenProps<TabParamList>['navigation'];
