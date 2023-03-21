import './Home.css';
import Chat from 'components/chat/Chat';
import Sidebar from 'components/sidebar/Sidebar';
import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

const Home = () => {
  const { getChats } = useActions();
  const userId = useAppSelector(state => state.user?.id);

  useEffect(() => {
    getChats(userId!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
