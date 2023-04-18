import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';
import ChatBody from 'components/chatBody/ChatBody';

const Home = () => {
  const { getChats } = useActions();
  const userId = useAppSelector(state => state.user?.id);

  useEffect(() => {
    getChats(userId!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="__main">
      <ChatBody />
    </div>
  );
};

export default Home;
