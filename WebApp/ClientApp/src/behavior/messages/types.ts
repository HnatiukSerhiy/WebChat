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

export type MessagesState = {
  chats: Chat[];
  currentChatId: string | null;
};

export type Chat = {
  id: string;
  messages: Message[];
};

export type EmptyChat = {
  receiverId: number;
};

export type SendMessageResponse = {
  messages: {
    send: {
      message: Message;
      chatId: string;
    };
  };
};

export type GetChatsResponse = {
  messages: {
    getChats: {
      id: string;
      messages: Message[];
    }[];
  };
};
