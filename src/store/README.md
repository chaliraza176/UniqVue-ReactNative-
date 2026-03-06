# Redux Store Documentation

## Overview

The Redux store manages global application state using Redux Toolkit. It's configured with four main slices: auth, event, photo, and subscription.

## Store Structure

```
store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
├── slices/
│   ├── authSlice.ts      # Authentication state
│   ├── eventSlice.ts     # Event management state
│   ├── photoSlice.ts     # Photo gallery state
│   └── subscriptionSlice.ts  # Subscription state
```

## Usage

### Import Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@store/hooks';
```

### Auth Slice

**State:**
- `user`: Current user object or null
- `token`: JWT token or null
- `isAuthenticated`: Boolean authentication status
- `loading`: Loading state for auth operations
- `error`: Error message or null

**Actions:**
```typescript
import { setCredentials, logout, updateUser, setLoading, setError } from '@store/slices/authSlice';

// Login/Register
dispatch(setCredentials({ user, token }));

// Logout
dispatch(logout());

// Update user profile
dispatch(updateUser({ name: 'New Name', profileImage: 'url' }));

// Set loading state
dispatch(setLoading(true));

// Set error
dispatch(setError('Error message'));
```

**Selectors:**
```typescript
import { selectUser, selectToken, selectIsAuthenticated, selectUserRole } from '@store/slices/authSlice';

const user = useAppSelector(selectUser);
const token = useAppSelector(selectToken);
const isAuthenticated = useAppSelector(selectIsAuthenticated);
const userRole = useAppSelector(selectUserRole);
```

### Event Slice

**State:**
- `events`: Array of event objects
- `currentEvent`: Currently selected event or null
- `loading`: Loading state
- `error`: Error message or null

**Actions:**
```typescript
import { setEvents, setCurrentEvent, addEvent, removeEvent, setLoading, setError, clearError } from '@store/slices/eventSlice';

// Set all events
dispatch(setEvents(eventsArray));

// Set current event
dispatch(setCurrentEvent(event));

// Add new event
dispatch(addEvent(newEvent));

// Remove event
dispatch(removeEvent(eventId));

// Clear error
dispatch(clearError());
```

**Selectors:**
```typescript
import { selectEvents, selectCurrentEvent, selectEventLoading, selectEventError } from '@store/slices/eventSlice';

const events = useAppSelector(selectEvents);
const currentEvent = useAppSelector(selectCurrentEvent);
const loading = useAppSelector(selectEventLoading);
```

### Photo Slice

**State:**
- `photos`: Array of photo objects
- `currentPhoto`: Currently selected photo or null
- `loading`: Loading state for fetching
- `uploading`: Upload progress state
- `error`: Error message or null

**Actions:**
```typescript
import { setPhotos, setCurrentPhoto, addPhoto, updatePhoto, setLoading, setUploading, setError, clearError } from '@store/slices/photoSlice';

// Set all photos
dispatch(setPhotos(photosArray));

// Set current photo
dispatch(setCurrentPhoto(photo));

// Add new photo
dispatch(addPhoto(newPhoto));

// Update photo (likes, comments)
dispatch(updatePhoto(updatedPhoto));

// Set uploading state
dispatch(setUploading(true));
```

**Selectors:**
```typescript
import { selectPhotos, selectCurrentPhoto, selectPhotoLoading, selectPhotoUploading } from '@store/slices/photoSlice';

const photos = useAppSelector(selectPhotos);
const currentPhoto = useAppSelector(selectCurrentPhoto);
const uploading = useAppSelector(selectPhotoUploading);
```

### Subscription Slice

**State:**
- `subscription`: Subscription object or null
- `loading`: Loading state
- `error`: Error message or null

**Actions:**
```typescript
import { setSubscription, setLoading, setError, clearError } from '@store/slices/subscriptionSlice';

// Set subscription
dispatch(setSubscription(subscriptionData));

// Clear subscription
dispatch(setSubscription(null));
```

**Selectors:**
```typescript
import { selectSubscription, selectSubscriptionPlan, selectSubscriptionStatus } from '@store/slices/subscriptionSlice';

const subscription = useAppSelector(selectSubscription);
const plan = useAppSelector(selectSubscriptionPlan);
const status = useAppSelector(selectSubscriptionStatus);
```

## Example Component

```typescript
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectUser, selectIsAuthenticated } from '@store/slices/authSlice';
import { selectEvents, setEvents } from '@store/slices/eventSlice';

const EventListScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const events = useAppSelector(selectEvents);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch events from API
      fetchEvents().then(data => {
        dispatch(setEvents(data));
      });
    }
  }, [isAuthenticated]);

  return (
    <View>
      <Text>Welcome {user?.name}</Text>
      {events.map(event => (
        <Text key={event._id}>{event.title}</Text>
      ))}
    </View>
  );
};
```

## Best Practices

1. **Use Typed Hooks**: Always use `useAppDispatch` and `useAppSelector` instead of plain `useDispatch` and `useSelector`
2. **Use Selectors**: Import and use the provided selectors for type safety
3. **Handle Loading States**: Check loading states before rendering data
4. **Clear Errors**: Clear errors when appropriate (e.g., when user dismisses error message)
5. **Normalize Data**: Keep data normalized in slices to avoid duplication
6. **Async Operations**: Handle async operations in components or services, then dispatch results to store

## Type Safety

All slices are fully typed with TypeScript. The store exports `RootState` and `AppDispatch` types that are used by the typed hooks.

```typescript
import type { RootState, AppDispatch } from '@store/index';

// Use in custom hooks or utilities
const getState = (): RootState => store.getState();
```
