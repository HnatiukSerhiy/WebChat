import type { UserLoginInput } from 'behavior/authentication/types';
import { Box, Typography, TextField, Link, InputAdornment, IconButton, Button } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import useFormContext, { type ValidationRules } from 'hooks/useFormContext';
import { useState } from 'react';
import { Path } from 'utilities/enums';
import LoginIcon from '@mui/icons-material/Login';
import useActions from 'hooks/useActions';
import useLoggined from 'hooks/useLoggined';

type FormValues = {
  email?: string;
  password?: string;
};

const validationRules: ValidationRules = {
  email: ['email', 'required'],
  password: ['required'],
};

const LoginForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const {
    values,
    errors,
    isFormValid,
    onValueChange,
    onBlur,
  } = useFormContext<FormValues>(validationRules);
  const { loginUser } = useActions();
  useLoggined();

  const handleSubmit = () => {
    isFormValid && loginUser(values as UserLoginInput);
  };

  return (
    <Box sx={{ maxWidth: '25rem' }} boxShadow={'5px 5px 10px #ccc'} padding={5}>
      <Typography display={'flex'} alignItems="flex-end" gap={'0.5rem'} variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Login
        <LoginIcon fontSize="large" />
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          type="email"
          name="email"
          onChange={onValueChange}
          error={errors['email']}
          helperText={errors['email'] ? 'Provide valid email' : ''}
          onBlur={onBlur}
        />
        <TextField
          id="standard-adornment-password"
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          required
          type={isPasswordVisible ? 'text' : 'password'}
          InputProps={{ endAdornment: (<InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(state => !state)}
              >
                {isPasswordVisible ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>) }}
          name="password"
          onChange={onValueChange}
          error={errors['password']}
          helperText={errors['password'] ? 'Provide password' : ''}
          onBlur={onBlur}
        />
        <Typography>
          Don't have an account? <Link href={Path.Register}>Register</Link>
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ py: '0.8rem', mt: '1rem' }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
