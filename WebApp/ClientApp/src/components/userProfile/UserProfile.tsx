import './userProfile.css';
import { Avatar, Button } from '@mui/material';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

const UserProfile = () => {
  const user = useAppSelector(state => state.user);

  const { logoutUser } = useActions();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
          <Avatar />
        <h4>{user?.firstname} {user?.lastname}</h4>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="profile__card open">
        <div className="card__header">
          <h4>Description</h4>
        </div>
        <div className="card__content">
          {user?.description}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
