import { type ReactElement, useEffect } from 'react';
import useActions from 'hooks/useActions';
import useAppSelector from 'hooks/useAppSelector';
import { Navigate } from 'react-router-dom';
import { Path } from 'utilities/enums';

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

  if (!user)
    return <Navigate to={Path.Login} />;

  return children;
};

export default WithTokenRefresh;
