# API Service Layer

This directory contains the API service layer for the UniqVue mobile application. All backend communication is handled through these services.

## Architecture

### Core Components

1. **api.ts** - Axios instance with interceptors
2. **types.ts** - TypeScript interfaces for all API requests/responses
3. **Service modules** - Domain-specific API methods

### Features

- ✅ JWT authentication with automatic token attachment
- ✅ Request/response interceptors
- ✅ 401 error handling with token cleanup
- ✅ Request queuing during token refresh
- ✅ Comprehensive error handling
- ✅ TypeScript type safety for all endpoints
- ✅ Centralized API endpoint configuration

## Service Modules

### authService
Handles user authentication and registration.

**Methods:**
- `register(data)` - Register new user account
- `login(data)` - Login with email/password
- `getProfile()` - Get current user profile
- `logout()` - Clear authentication token

### userService
Manages user profile updates.

**Methods:**
- `updateProfile(data)` - Update name and profile image
- `updateInstagram(data)` - Update Instagram link

### eventService
Handles event creation and management.

**Methods:**
- `createEvent(data)` - Create new event
- `getEvents(query?)` - Get all events with optional filters
- `getEventById(eventId)` - Get specific event details
- `deleteEvent(eventId)` - Delete an event
- `rsvpToEvent(eventId, data)` - RSVP to an event
- `getEventRSVPs(eventId)` - Get all RSVPs for an event

### photoService
Manages photo uploads and interactions.

**Methods:**
- `uploadPhoto(data)` - Upload photo to event
- `getEventPhotos(eventId, query?)` - Get photos with optional filters
- `likePhoto(photoId)` - Like a photo
- `unlikePhoto(photoId)` - Unlike a photo
- `commentOnPhoto(photoId, data)` - Add comment to photo
- `downloadPhoto(photoId)` - Download HD photo (Premium feature)

### subscriptionService
Handles subscription management.

**Methods:**
- `createSubscription(data)` - Create new subscription (returns Stripe URL)
- `getSubscriptionStatus()` - Get current subscription status
- `cancelSubscription()` - Cancel active subscription

### aiService
Manages AI face detection and tagging.

**Methods:**
- `detectFaces(data)` - Trigger face detection (internal)
- `tagPhoto(data)` - Manually tag user in photo

### analyticsService
Provides business analytics (Business tier only).

**Methods:**
- `getEventAnalytics(eventId)` - Get comprehensive event analytics

## Usage Examples

### Authentication
```typescript
import { authService } from '@services';

// Register
const response = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123'
});

// Login
const loginResponse = await authService.login({
  email: 'john@example.com',
  password: 'securePassword123'
});

// Token is automatically stored and attached to subsequent requests
```

### Event Management
```typescript
import { eventService } from '@services';

// Create event
const event = await eventService.createEvent({
  title: 'Birthday Party',
  description: 'My 30th birthday celebration',
  date: '2024-06-15T18:00:00Z',
  location: 'Central Park, NYC'
});

// Get events with search
const events = await eventService.getEvents({
  search: 'birthday',
  dateFrom: '2024-01-01',
  dateTo: '2024-12-31'
});

// RSVP to event
await eventService.rsvpToEvent(eventId, {
  status: 'ACCEPTED'
});
```

### Photo Operations
```typescript
import { photoService } from '@services';

// Upload photo
const photo = await photoService.uploadPhoto({
  eventId: 'event123',
  imageUri: 'file:///path/to/image.jpg'
});

// Get photos filtered by tagged user
const photos = await photoService.getEventPhotos('event123', {
  taggedUserId: 'user456'
});

// Like photo
await photoService.likePhoto('photo789');

// Add comment
await photoService.commentOnPhoto('photo789', {
  text: 'Great photo!'
});
```

### Subscription Management
```typescript
import { subscriptionService } from '@services';

// Create subscription
const { checkoutUrl } = await subscriptionService.createSubscription({
  plan: 'PREMIUM'
});

// Open checkoutUrl in browser for payment

// Check status
const { subscription } = await subscriptionService.getSubscriptionStatus();
console.log(subscription.plan); // 'PREMIUM'
```

## Error Handling

All services throw errors that can be caught and handled:

```typescript
try {
  await authService.login({ email, password });
} catch (error) {
  if (error.statusCode === 401) {
    console.error('Invalid credentials');
  } else if (error.statusCode === 429) {
    console.error('Too many attempts');
  } else {
    console.error(error.message);
  }
}
```

## TypeScript Types

All request and response types are defined in `types.ts`. Import them as needed:

```typescript
import type {
  User,
  Event,
  Photo,
  CreateEventRequest,
  EventResponse
} from '@services/types';
```

## Configuration

API base URL is configured in `@config/api.config.ts`:
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.uniqvue.com/api/v1`

## Interceptors

### Request Interceptor
- Automatically attaches JWT token from AsyncStorage
- Adds `Authorization: Bearer <token>` header

### Response Interceptor
- Handles 401 errors by clearing token
- Queues requests during token refresh
- Formats error messages consistently

## Security

- JWT tokens stored in AsyncStorage (consider upgrading to secure storage)
- Tokens automatically cleared on 401 responses
- All requests use HTTPS in production
- Request timeout set to 30 seconds

## Future Enhancements

- [ ] Implement token refresh mechanism
- [ ] Add request retry logic for network failures
- [ ] Implement offline request queuing
- [ ] Add request/response logging in development
- [ ] Migrate to secure storage for tokens
- [ ] Add request cancellation support
- [ ] Implement request deduplication
