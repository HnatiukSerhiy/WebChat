import './chatContent.css';
import type { Message } from 'behavior/messages/types';
import { useState, createRef, useEffect } from 'react';
import ChatItem from './ChatItem';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  messages: Message[];
};

const ChatContent = ({ messages }: Props) => {
  const messagesEndRef = createRef<HTMLDivElement>();
  const chatItms = [
    {
      key: 1,
      image:
        'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
      type: '',
      msg: 'Hi Tim, How are you?',
    },
    {
      key: 2,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'I am fine.',
    },
  ];

  const [state, setState] = useState({
    chat: chatItms,
    msg: '',
  });

  const scrollToBottom = () => {
    (messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStateChange = (e: any) => {
    setState(prev => ({ ...prev, msg: e.target.value }));
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar />
            <p>Tim Hover</p>
          </div>
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
          {state.chat.map(itm => {
            return (
              <ChatItem
                // animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : 'me'}
                msg={itm.msg}
                image={itm.image}
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
            onChange={onStateChange}
            value={state.msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
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
