import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

const Home = () => {
  const messages = useAppSelector(state => state.messages);
  console.log(messages);

  const { sendMessage } = useActions();

  const onClick = () => {
    sendMessage({ message: 'okay' });
  };

  return (
    <div>
      Welcome!
      <button onClick={onClick}>Send msg</button>
    </div>
  );
};

export default Home;
