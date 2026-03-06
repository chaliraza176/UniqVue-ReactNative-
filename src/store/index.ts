import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import photoReducer from './slices/photoSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import themeReducer from './slices/themeSlice';

// Persist config for auth slice - exclude loading and error states
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

// Persist config for event slice - exclude loading and error states
const eventPersistConfig = {
  key: 'event',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

// Persist config for photo slice - exclude loading, uploading, and error states
const photoPersistConfig = {
  key: 'photo',
  storage: AsyncStorage,
  blacklist: ['loading', 'uploading', 'error'],
};

// Persist config for subscription slice - exclude loading and error states
const subscriptionPersistConfig = {
  key: 'subscription',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

// Persist config for theme slice - persist everything
const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

// Combine reducers with individual persist configs
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  event: persistReducer(eventPersistConfig, eventReducer),
  photo: persistReducer(photoPersistConfig, photoReducer),
  subscription: persistReducer(subscriptionPersistConfig, subscriptionReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

