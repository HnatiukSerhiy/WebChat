import './Search.css';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';
import { useState, type ChangeEvent, useEffect } from 'react';
import SearchItem from './SearchItem/SearchItem';

const Search = () => {
  const [pattern, setPattern] = useState<string | null>(null);

  const { searchUser } = useActions();

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const pattern = event.target.value.trim().length === 0 ? null : event.target.value.toLocaleLowerCase();
    setPattern(pattern);
  };

  const onClick = () => {
    pattern && searchUser(pattern);
  };

  // useEffect(() => {
  //   searchUser(pattern ?? 'empty');
  // }, [pattern]);

  const users = useAppSelector(state => state.users);

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" onChange={onSearch} />
        <button onClick={onClick}>Search</button>
      </div>
      {users.map((user, index) => <SearchItem key={index} user={user} />)}
    </div>
  );
};

export default Search;
