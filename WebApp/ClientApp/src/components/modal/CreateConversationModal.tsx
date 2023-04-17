import {
  DialogTitle,
  IconButton,
  Typography,
  Modal,
  Box,
  TextField,
  OutlinedInputProps,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchList from './searchList/SearchList';
import performGraphRequest from 'api/performGraphRequest';
import { searchUserQuery } from 'behavior/users/queries';
import { UserSearchResponse } from 'behavior/users/types';
import { map } from 'rxjs';
import { User } from 'behavior/authentication/types';
import { useState } from 'react';

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
  handleClose: () => void;
  handleCreateConversation: (receiverId: number) => void;
  visible: boolean;
};

const searchUsers = (pattern: string | null, onSubscribe: (users: User[]) => void) => {
  const observable = performGraphRequest<UserSearchResponse>(searchUserQuery, { input: pattern }).pipe(
    map(response => response.user.searchByName),
  );
  observable.subscribe(onSubscribe);
};

const CreateConversationModal = ({ handleClose, visible, handleCreateConversation }: Props) => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value.trim().length === 0) {
      setSearchedUsers([]);
      return;
    }

    const pattern = event.target.value.trim();
    searchUsers(pattern, users => setSearchedUsers(users));
  };

  const inputProps: OutlinedInputProps = {
    endAdornment: (
      <InputAdornment position="end">
          <SearchIcon />
      </InputAdornment>
    ),
  };

  return (
    <Modal
      open={visible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <DialogTitle style={{ padding: 0 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{' Create a conversation'}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Typography marginBottom={'20px'} id="modal-modal-description" sx={{ mt: 2 }}>
        Serach users to create a new conversation with them.
      </Typography>
      <TextField
        id="search-bar"
        className="text"
        onChange={handleChange}
        style={{ width: '90%' }}
        label="Enter a user name"
        InputProps={inputProps}
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      {/* <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton> */}
      <SearchList handleUserClick={handleCreateConversation} users={searchedUsers} />
    </Box>
  </Modal>
  );
};

export default CreateConversationModal;
