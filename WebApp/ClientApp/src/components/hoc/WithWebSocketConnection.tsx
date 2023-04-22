import { type ReactElement, useEffect } from 'react';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

type Props = {
  children: ReactElement;
};

const WithWebSocketConnection = ({ children }: Props) => {
  const { createWebSocketConnection, disconnectWebSocket } = useActions();

  const userId = useAppSelector(state => state.user!.id);

  useEffect(() => {
    createWebSocketConnection({ userId });

    // return () => {
    //   disconnectWebSocket();
    // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default WithWebSocketConnection;
