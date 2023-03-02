export type  SubscriptionMessage = {
  query: string;
  variables?: Record<string, unknown>;
  operationName: string;
};

export type OperationType = 'start' | 'connection_init';

export type StartSubscriptionOperation = {
  id: string;
  type: OperationType;
  payload: SubscriptionMessage;
};
