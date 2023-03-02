import { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from 'utilities/enums';

type Props = {
  children: ReactElement;
};

const RequireAuthenticated = ({ children }: Props) => {
  const token = localStorage.getItem('AccessToken');

  if (token)
    return children;

  return <Navigate to={Path.Login} />;
};

export default RequireAuthenticated;
