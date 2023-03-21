import './Message.css';
import type { Message as MessageType } from 'behavior/messages/types';

type Props = {
  message: MessageType;
};

const Message = ({ message: { value } }: Props) => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img src={require('assets/user.png')} alt="User icon" />
      </div>
      <div className="message-content">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Message;
