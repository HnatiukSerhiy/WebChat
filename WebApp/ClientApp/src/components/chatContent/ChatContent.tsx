import './chatContent.css';
import type { Message, MessageInput } from 'behavior/messages/types';
import { useState, createRef, useEffect } from 'react';
import ChatItem from './ChatItem';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useAppSelector from 'hooks/useAppSelector';
import useActions from 'hooks/useActions';
import { User } from 'behavior/authentication/types';

type Props = {
  messages: Message[];
  user?: User;
};

const ChatContent = ({ messages, user }: Props) => {
  const [message, setMessage] = useState<string>('');

  const messagesEndRef = createRef<HTMLDivElement>();
  const currentUserId = useAppSelector(state => state.user?.id);

  const { sendMessage } = useActions();

  const scrollToBottom = () => {
    (messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessageSent = () => {
    if (message.trim().length > 0 && currentUserId) {
      const payload: MessageInput = {
        senderId: currentUserId,
        receiverId: user?.id ?? 0,
        value: message,
      };

      sendMessage(payload);
    }
    setMessage('');
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          {user && <div className="current-chatting-user">
            <Avatar />
            <p>{user?.firstname} {user?.lastname}</p>
          </div>}
        </div>
        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog" />
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {messages.map(item => {
            return (
              <ChatItem
                // animationDelay={index + 2}
                key={item.id}
                user={item.senderId === currentUserId ? 'me' : 'other'}
                message={item.value}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <input
            type="text"
            placeholder="Type a message here"
            onChange={e => setMessage(e.target.value)}
            value={message}
          />
          <button onClick={handleMessageSent} className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane">
              <SendIcon />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
