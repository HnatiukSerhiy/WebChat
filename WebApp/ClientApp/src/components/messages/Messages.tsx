import './Messages.css';
import Message from 'components/message/Message';
import { Message as Type } from 'behavior/messages/types';

type Props = {
  messages: Type[];
};

const Messages = ({ messages }: Props) => {
  return (
    <div className="messages">
      {messages.map(message => <Message message={message} />)}
    </div>
  );
};

export default Messages;
