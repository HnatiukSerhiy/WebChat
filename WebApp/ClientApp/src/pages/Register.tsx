import { Grid } from '@mui/material';
import RegisterForm from 'components/forms/register/RegisterForm';
import useActions from 'hooks/useActions';
import { useEffect } from 'react';

const Register = () => {
  const { logoutUser } = useActions();

  useEffect(() => {
    logoutUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={3}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default Register;
