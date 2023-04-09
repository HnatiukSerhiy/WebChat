import useAppSelector from 'hooks/useAppSelector';

const Navbar = () => {
  const user = useAppSelector(state => state.user);

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={require('assets/user.png')} alt="User icon" />
        <span>{user?.firstname} {user?.lastname}</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
