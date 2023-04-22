import { ListItemAvatar, Avatar } from '@mui/material';

type Props = {
  animationDelay: any;
  active?: string;
  isOnline: string;
  image?: string;
  user:{
    id?: number;
    name: string;
  };
  lastMessage?: string;
  onClick: (userId: number, chatId: string) => void;
  chatId: string;
};

const ChatListItems = ({ animationDelay, active, user: { id, name }, lastMessage, onClick, chatId }: Props) => {
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => onClick(id ?? 0, chatId)}
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
