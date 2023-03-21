import useAppSelector from 'hooks/useAppSelector';

const Chats = () => {
  const chats = useAppSelector(state => state.messages);

  return (
    <div className="chats">
      {chats.map(({ messages, id }) => (
        <div key={id} className="user-chat">
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
