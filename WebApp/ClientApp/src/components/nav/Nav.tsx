import './nav.css';
import logo from 'assets/logo.svg';

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav__blocks">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav__blocks" />
      <div className="nav__blocks" />
    </div>
  );
};

export default Nav;
