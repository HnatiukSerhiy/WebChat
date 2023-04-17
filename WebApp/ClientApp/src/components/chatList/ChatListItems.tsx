import { ListItemAvatar, Avatar } from '@mui/material';

type Props = {
  animationDelay: any;
  active?: string;
  isOnline: string;
  image?: string;
  name: string;
  lastMessage?: string;
  onClick: (chatId: string) => void;
  chatId: string;
};

const ChatListItems = ({ animationDelay, active, name, lastMessage, onClick, chatId }: Props) => {
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => onClick(chatId)}
      className={`chatlist__item ${active ? active : ''} `}
    >
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <ListItemAvatar>
          <Avatar alt={'Avatar'} />
        </ListItemAvatar>
      </div>
      <div className="userMeta">
        <p>{name}</p>
        {lastMessage && <span className="activeTime">{lastMessage}</span>}
      </div>
    </div>
  );
};

export default ChatListItems;
