const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={require('assets/user.png')} alt="User icon" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
