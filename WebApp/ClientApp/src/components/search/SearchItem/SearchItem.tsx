import type { User } from 'behavior/authentication/types';

type Props = {
  user: User;
};

const SearchItem = ({ user }: Props) => {
  return (
    <div className="user-chat search-item">
      <img src={require('assets/user.png')} alt="User icon" />
      <div className="user-chat-info">
          <span>{user.firstname} {user.lastname}</span>
      </div>
    </div>
  );
};

export default SearchItem;
