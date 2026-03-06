# UniqVue Mobile App - Source Code

## Folder Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components for navigation
├── navigation/     # Navigation configuration
├── services/       # API services and external integrations
├── store/          # Redux store, slices, and state management
├── hooks/          # Custom React hooks
├── utils/          # Utility functions and helpers
├── config/         # Configuration files (API, constants)
└── types/          # TypeScript type definitions
```

## Key Technologies

- **React Native 0.84** - Cross-platform mobile framework
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - State management
- **React Navigation** - Navigation and routing
- **Axios** - HTTP client for API calls

## Development Guidelines

### State Management
- Use Redux Toolkit for global state (auth, events, photos, subscriptions)
- Use local state for component-specific UI state
- Keep business logic in Redux slices

### API Integration
- All API calls go through the services layer
- Use TypeScript interfaces for request/response types
- Handle errors consistently with try-catch blocks

### Component Structure
- Separate presentational and container components
- Use functional components with hooks
- Keep components focused and single-purpose

### Code Quality
- Run `npm run lint` before committing
- Follow TypeScript strict mode
- Use path aliases (@config, @services, etc.)

## Getting Started

1. Install dependencies: `npm install`
2. Start Metro bundler: `npm start`
3. Run on Android: `npm run android`
4. Run on iOS: `npm run ios`

## Testing

Run tests with: `npm test`
