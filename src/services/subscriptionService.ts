import { api } from './api';
import { API_ENDPOINTS } from '@config/api.config';
import type {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  SubscriptionStatusResponse,
  CancelSubscriptionResponse,
} from './types';

export const subscriptionService = {
  /**
   * Create a new subscription (returns Stripe checkout URL)
   */
  createSubscription: async (
    data: CreateSubscriptionRequest
  ): Promise<CreateSubscriptionResponse> => {
    const response = await api.post<CreateSubscriptionResponse>(
      API_ENDPOINTS.SUBSCRIPTION.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Get current subscription status
   */
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>(
      API_ENDPOINTS.SUBSCRIPTION.STATUS
    );
    return response.data;
  },

  /**
   * Cancel current subscription
   */
  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const response = await api.post<CancelSubscriptionResponse>(
      API_ENDPOINTS.SUBSCRIPTION.CANCEL
    );
    return response.data;
  },
};
