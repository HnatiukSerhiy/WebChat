import type { ValidationRules } from 'hooks/useFormContext';
import { UserRegisterInput } from 'behavior/authentication/types';
import { Box, Typography, TextField, Link, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Path } from 'utilities/enums';
import LoginIcon from '@mui/icons-material/Login';
import useFormContext from 'hooks/useFormContext';
import useActions from 'hooks/useActions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

type FormValues = {
  lastname?: string;
  firstname?: string;
  password?: string;
  email?: string;
  description?: string;
};

const validationRules: ValidationRules = {

};

const RegisterForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const {
    values,
    onValueChange,
    onBlur,
    errors,
    isFormValid,
  } = useFormContext<FormValues>(validationRules);

  const { registerUser } = useActions();

  const handleSubmit = () => isFormValid && registerUser(values as UserRegisterInput);

  return (
    <Box sx={{ maxWidth: '25rem' }} boxShadow={'5px 5px 10px #ccc'} padding={5}>
      <Typography display={'flex'} alignItems="flex-end" gap={'0.5rem'} variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Register
        <LoginIcon fontSize="large" />
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ mb: 2 }}
          label="Firstname"
          fullWidth
          required
          type="text"
          name="firstname"
          onChange={onValueChange}
          error={errors['firstname']}
          // eslint-disable-next-line @typescript-eslint/quotes
          helperText={errors['firstname'] ? `Value can't be empty` : ''}
          onBlur={onBlur}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Lastname"
          fullWidth
          required
          type="text"
          name="lastname"
          onChange={onValueChange}
          error={errors['lastname']}
          helperText={errors['lastname'] ? 'Provide valid lastname' : ''}
          onBlur={onBlur}
        />
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
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          required
          type={isPasswordVisible ? 'text' : 'password'}
          name="password"
          onChange={onValueChange}
          InputProps={{ endAdornment: (<InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(state => !state)}
              >
                {isPasswordVisible ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>) }}
          error={errors['password']}
          helperText={errors['password'] ? 'Provide password' : ''}
          onBlur={onBlur}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Description"
          fullWidth
          type="text"
          name="description"
          onChange={onValueChange}
          error={errors['description']}
          helperText={errors['description'] ? 'Provide valid description' : ''}
          onBlur={onBlur}
        />
        <Typography>
          Already have an account? <Link href={Path.Login}>Login</Link>
        </Typography>
        <LoadingButton
          variant="contained"
          fullWidth
          // type="submit"
          loading={false}
          sx={{ py: '0.8rem', mt: '1rem' }}
          onClick={handleSubmit}
        >
          Register
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default RegisterForm;