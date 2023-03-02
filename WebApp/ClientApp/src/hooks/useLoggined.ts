import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utilities/enums';
import useAppSelector from './useAppSelector';

const useLoggined = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    user && navigate(Path.Home);
  }, [user, navigate]);
};

export default useLoggined;
