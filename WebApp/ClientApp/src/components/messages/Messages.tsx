import './Messages.css';
import Message from 'components/message/Message';

const Messages = () => {
  return (
    <div className="messages">
      <Message message={{ value: 'hello' } as any} />
      <Message message={{ value: 'hello' } as any} />
    </div>
  );
};

export default Messages;
