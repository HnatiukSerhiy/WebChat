export type  SubscriptionStartMessage = {
  query: string;
  variables?: Record<string, unknown>;
  operationName: string;
};

export type OperationType = 'start' | 'connection_init';

export type WebSocketOperation = {
  id: string;
  type: OperationType;
  payload: SubscriptionStartMessage;
};
