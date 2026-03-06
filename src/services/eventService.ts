import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  CreateEventRequest,
  EventResponse,
  EventsResponse,
  DeleteEventResponse,
  GetEventsQuery,
  CreateRSVPRequest,
  RSVPResponse,
  RSVPsResponse,
} from './types';

export const eventService = {
  /**
   * Create a new event
   */
  createEvent: async (data: CreateEventRequest): Promise<EventResponse> => {
    const response = await api.post<EventResponse>(
      API_ENDPOINTS.EVENTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Get all events for the current user
   */
  getEvents: async (query?: GetEventsQuery): Promise<EventsResponse> => {
    const response = await api.get<EventsResponse>(API_ENDPOINTS.EVENTS.LIST, {
      params: query,
    });
    return response.data;
  },

  /**
   * Get event by ID
   */
  getEventById: async (eventId: string): Promise<EventResponse> => {
    const response = await api.get<EventResponse>(
      API_ENDPOINTS.EVENTS.DETAIL(eventId)
    );
    return response.data;
  },

  /**
   * Delete an event
   */
  deleteEvent: async (eventId: string): Promise<DeleteEventResponse> => {
    const response = await api.delete<DeleteEventResponse>(
      API_ENDPOINTS.EVENTS.DELETE(eventId)
    );
    return response.data;
  },

  /**
   * RSVP to an event
   */
  rsvpToEvent: async (
    eventId: string,
    data: CreateRSVPRequest
  ): Promise<RSVPResponse> => {
    const response = await api.post<RSVPResponse>(
      API_ENDPOINTS.EVENTS.RSVP(eventId),
      data
    );
    return response.data;
  },

  /**
   * Get all RSVPs for an event
   */
  getEventRSVPs: async (eventId: string): Promise<RSVPsResponse> => {
    const response = await api.get<RSVPsResponse>(
      API_ENDPOINTS.EVENTS.RSVPS(eventId)
    );
    return response.data;
  },
};
