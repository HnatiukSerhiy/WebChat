import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

const Chats = () => {
  const messages = useAppSelector(state => state.messages);
  const { setCurrentChatId } = useActions();

  const onChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
  };
  console.log(messages);
  return (
    <div className="chats">
      {messages?.chats?.map(({ messages, id }) => (
        <div key={id} onClick={() => onChatClick(id)} className="user-chat">
          <img src="" alt="" />
          <div className="user-chat-info">
            <span>User</span>
            <p>{messages[messages.length - 1].value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
