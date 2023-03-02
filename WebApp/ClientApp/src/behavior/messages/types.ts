export type MessageInput = {
  message: string;
};

export type Message = {
  message: string;
};

export type MessagesState = Message[];

export type SendMessageResponse = {
  messages: {
    send: Message;
  };
};
