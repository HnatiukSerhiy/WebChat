import { MessageInput } from 'behavior/messages/types';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';
import { useState } from 'react';
import './Input.css';

type Props = {
  receiverId: number;
};

const Input = ({ receiverId }: Props) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useActions();

  const senderId = useAppSelector(state => state.user?.id);

  const onMessageSend = () => {
    const isMessageValid = message.trim().length > 0;

    if (isMessageValid && senderId) {
      const payload: MessageInput = {
        message,
        senderId,
        receiverId,
      };
      sendMessage(payload);
    }

  };

  return (
    <div className="input">
      <input type="text" placeholder="Type something..." onChange={e => setMessage(e.target.value)} />
      <div className="send">
        <img src="" alt="" />
        {/* <input type="text" style={{display: "none"}} /> */}
      <button onClick={onMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
