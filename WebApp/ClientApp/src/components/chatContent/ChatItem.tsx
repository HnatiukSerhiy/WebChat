import { Avatar } from '@mui/material';

type Props = {
  user: string;
  message: string;
  image?: string;
};

const ChatItem = ({ user, message }: Props) => {
  return (
    <div
      style={{ animationDelay: '0.8s' }}
      className={`chat__item ${user ? user : ''}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{message}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <Avatar />
    </div>
  );
};

export default ChatItem;
