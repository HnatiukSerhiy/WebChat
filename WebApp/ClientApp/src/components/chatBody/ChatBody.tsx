import './chatBody.css';
import ChatList from '../chatList/ChatList';
import ChatContent from '../chatContent/ChatContent';
import UserProfile from '../userProfile/UserProfile';
import { useMemo, useState } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import { User } from 'behavior/authentication/types';

const ChatBody = () => {
  const [currentChatKey, setCurentChatKey] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const chats = useAppSelector(state => state.messages.chats);

  const messages = useMemo(() => chats.find(chat => chat.id === currentChatKey)?.messages, [chats, currentChatKey]);

  return (
    <div className="main__chatbody">
      <ChatList setCurrentChatKey={setCurentChatKey} setUser={setUser} />
      <ChatContent messages={messages ?? []} user={user} />
      <UserProfile />
    </div>
  );
};

export default ChatBody;
