import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type { AnalyticsResponse } from './types';

export const analyticsService = {
  /**
   * Get analytics for a specific event (Business tier only)
   */
  getEventAnalytics: async (eventId: string): Promise<AnalyticsResponse> => {
    const response = await api.get<AnalyticsResponse>(
      API_ENDPOINTS.ANALYTICS.EVENT(eventId)
    );
    return response.data;
  },
};
