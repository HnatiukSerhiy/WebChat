export type MessageInput = {
  message: string;
  receiverId: number;
  senderId: number;
};

export type Message = {
  id: number;
  value: string;
  senderId: number;
  receiverId: number;
};

export type MessagesState = Chat[];

export type Chat = {
  id: string;
  messages: Message[];
};

export type SendMessageResponse = {
  messages: {
    send: Message;
  };
};

export type GetChatsResponse = {
  messages: {
    id: string;
    messages: Message[];
  } [];
};
