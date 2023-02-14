import { Grid } from '@mui/material';
import RegisterForm from 'components/forms/register/RegisterForm';

const Register = () => {
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
