import { type ReactElement, useEffect } from 'react';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';

type Props = {
  children: ReactElement;
};

const WithTokenRefresh = ({ children }: Props) => {
  const { refreshToken } = useActions();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    refreshToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user && children;
};

export default WithTokenRefresh;
