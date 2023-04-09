import './Chat.css';
import Input from 'components/input/Input';
import Messages from 'components/messages/Messages';
import useAppSelector from 'hooks/useAppSelector';

const Chat = () => {
  const currentChat = useAppSelector(state => {
    const currentChatId = state.messages.currentChatId;
    return state.messages?.chats?.find(c => c.id === currentChatId);
  });

  return (
    <div className="chat">
      <div className="chat-info">
        <span>User</span>
      </div>
      <Messages messages={currentChat?.messages ?? []} />
      <Input receiverId={0} />
    </div>
  );
};

export default Chat;
