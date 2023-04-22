import type { StartSubscriptionOperation } from './types';

export const createConnectionInitOperation = () => ({
  type: 'connection_init',
  payload: {},
});

export const createStartSubscriptionOperation = (query: string, variables?: Record<string, unknown>): StartSubscriptionOperation => ({
  type: 'start',
  id: '1',
  payload: {
    operationName: 'messagesSubscription',
    query,
    variables,
  },
});
