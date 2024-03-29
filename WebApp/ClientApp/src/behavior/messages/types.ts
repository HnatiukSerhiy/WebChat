export type MessageInput = {
  value: string;
  receiverId: number;
  senderId: number;
};

export type Message = {
  id: number;
  value: string;
  senderId: number;
  receiverId: number;
};

export type MessageReceived = {
  id: number;
  value: string;
  currentUserId: number;
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
  senderId: number;
  receiverId: number;
};

export type SendMessageResponse = {
  messages: {
    send: {
      id: string;
      messages: Message[];
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
