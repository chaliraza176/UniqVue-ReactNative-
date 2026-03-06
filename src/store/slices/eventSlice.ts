import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  qrCode: string;
  storageExpiryDate: string;
  createdAt: string;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      state.error = null;
    },
    setCurrentEvent: (state, action: PayloadAction<Event | null>) => {
      state.currentEvent = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.unshift(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEvents,
  setCurrentEvent,
  addEvent,
  removeEvent,
  setLoading,
  setError,
  clearError,
} = eventSlice.actions;

// Selectors
export const selectEvents = (state: { event: EventState }) => state.event.events;
export const selectCurrentEvent = (state: { event: EventState }) => state.event.currentEvent;
export const selectEventLoading = (state: { event: EventState }) => state.event.loading;
export const selectEventError = (state: { event: EventState }) => state.event.error;

export default eventSlice.reducer;
