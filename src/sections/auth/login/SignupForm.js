import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { signup } from "../../../Services/ApiServices";
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const initialUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const options = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Writer' },
    { value: 3, label: 'Viewer' },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6; 
  const onValueChange = (e) => {
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, role: e.value });
  };

  const handleClick = async () => {
    const { email, password, confirmPassword } = user;
    const newErrors = {};

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = !email ? 'Email is required' : 'Invalid email address';
    }

    // Validate password
    if (!validatePassword(password)) {
      newErrors.password = !password ? 'Password is required' : 'Password must be at least 6 characters long';
    }

    // Validate confirmPassword
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await signup(user);
  
        if (response.status === 200) {
          alert("Signup successful!");
        } else {
          console.log(response);
          alert("Signup failed! Try again later");
        }
        
        navigate('/login', { replace: true });
      } catch (err) {
        alert("Signup failed! Try again later");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" autoComplete="given-name" onChange={(e) => onValueChange(e)} />

        <TextField
          required
          name="email"
          label="Email address"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          autoComplete="new-password"
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          autoComplete="new-password"
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => onValueChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <Select
          name="role"
          placeholder="User role"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
          options={options}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Sign up
        </LoadingButton>
      </Stack>
    </>
  );
}
