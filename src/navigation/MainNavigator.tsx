import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/HomeScreen';
import { CreateEventScreen } from '@screens/CreateEventScreen';
import { EventDetailScreen } from '@screens/EventDetailScreen';
import { PhotoGalleryScreen } from '@screens/PhotoGalleryScreen';
import { PhotoViewerScreen } from '@screens/PhotoViewerScreen';
import { QRScannerScreen } from '@screens/QRScannerScreen';
import { ProfileScreen } from '@screens/ProfileScreen';
import { SubscriptionScreen } from '@screens/SubscriptionScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import type { MainStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📅</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* Main Tab Navigator */}
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />

      {/* Regular Stack Screens */}
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          title: 'Create Event',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          title: 'Event Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="PhotoGallery"
        component={PhotoGalleryScreen}
        options={{
          title: 'Photos',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: 'Subscription',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerBackTitle: 'Back',
        }}
      />

      {/* Modal Screens - Full screen presentation */}
      <Stack.Screen
        name="PhotoViewer"
        component={PhotoViewerScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{
          presentation: 'fullScreenModal',
          title: 'Scan QR Code',
          headerBackTitle: 'Cancel',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
