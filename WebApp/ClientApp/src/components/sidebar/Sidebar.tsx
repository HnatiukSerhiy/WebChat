import Chats from 'components/chats/Chats';
import Navbar from 'components/navbar/Navbar';
import Search from 'components/search/Search';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
