import { List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { User } from 'behavior/authentication/types';

type Props = {
  handleUserClick: (userId: number) => void;
  users: User[];
};

const SearchList = ({ handleUserClick, users }: Props) => {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.map((user, index) => {
          return (
            <ListItem
              key={user.id}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={'Avatar'} />
                </ListItemAvatar>
                <ListItemText
                  onClick={() => handleUserClick(user.id)}
                  id={`checkbox-list-secondary-label-${index}`}
                  primary={user.firstname + ' ' + user.lastname}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
  );
};

export default SearchList;
