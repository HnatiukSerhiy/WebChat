import './Chat.css';
import Input from 'components/input/Input';
import Messages from 'components/messages/Messages';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>User</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
