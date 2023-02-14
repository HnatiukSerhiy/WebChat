import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from 'utilities/enums';
import useAppSelector from 'hooks/useAppSelector';

type Props = {
  children: ReactElement;
};

const RequireAuthenticated = ({ children }: Props) => {
  const user = useAppSelector(state => state.user);

  if (user)
    return children;

  return <Navigate to={Path.Login} />;
};

export default RequireAuthenticated;
