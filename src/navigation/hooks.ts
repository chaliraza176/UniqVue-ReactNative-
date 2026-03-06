/**
 * Navigation Hooks
 * Type-safe navigation hooks for use throughout the app
 */

import { useNavigation } from '@react-navigation/native';
import type {
  AuthStackNavigationProp,
  MainStackNavigationProp,
  TabNavigationProp,
} from './types';

/**
 * Hook for type-safe navigation in Auth stack screens
 * Use in Login and Register screens
 */
export const useAuthNavigation = () => {
  return useNavigation<AuthStackNavigationProp>();
};

/**
 * Hook for type-safe navigation in Main stack screens
 * Use in all authenticated screens that need to navigate to other screens
 */
export const useMainNavigation = () => {
  return useNavigation<MainStackNavigationProp>();
};

/**
 * Hook for type-safe navigation in Tab screens
 * Use in Home and Profile tab screens
 */
export const useTabNavigation = () => {
  return useNavigation<TabNavigationProp>();
};
