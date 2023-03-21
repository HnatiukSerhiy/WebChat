import useActions from 'hooks/useActions';
import { type ChangeEvent } from 'react';

const Search = () => {
  const { searchUser } = useActions();

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    searchUser(event.target.value);
  };

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" onChange={onSearch} />
      </div>
      <div className="user-chat">
        <img src={require('assets/user.png')} alt="User icon" />
        <div className="user-chat-info">
          <span>User</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
