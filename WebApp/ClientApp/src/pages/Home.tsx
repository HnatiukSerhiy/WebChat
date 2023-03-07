import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';
import { useEffect } from 'react';

const Home = () => {
  const messages = useAppSelector(state => state.messages);
  console.log(messages);

  const { sendMessage } = useActions();

  const onClick = () => {
    sendMessage({ message: 'okay' });
  };

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <div>
      Welcome!
      <button onClick={onClick}>Send msg</button>
    </div>
  );
};

export default Home;
