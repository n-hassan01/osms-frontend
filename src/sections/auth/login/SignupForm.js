import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { compareOtp, sendOtp, signup } from '../../../Services/ApiServices';
// components
import Iconify from '../../../components/iconify';
// external css
import '../../../_css/SignupPage.css';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const initialUser = {
    id: '',
    password: '',
  };
  const [user, setUser] = useState(initialUser);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onVerify = async () => {
    const verifyUser = {
      verificationCode: otp,
      id: user.id,
      password: user.password,
    };
    const response = await compareOtp(verifyUser);
    
    if (response.status === 200) {
      alert('Signup completed!');
      navigate('/login', { replace: true });
    } else {
      alert('Otp Invalid!');
    }
    
    handleClose();
  };

  const validatePassword = (password) => password.length >= 6;
  const onValueChange = (e) => {
    if (e.target) setUser({ ...user, [e.target.name]: e.target.value });
    else setUser({ ...user, role: e.value });
  };

  const handleClick = async () => {
    const { id, password, confirmPassword } = user;
    const newErrors = {};

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
        const newUser = {
          id: user.id,
          password: user.password,
        };
        const response = await signup(newUser);

        if (response.status === 200 || response.status === 204) {
          if (response.data.authenticationMethod.flag === 'email') {
            const reqBody = {
              email: response.data.authenticationMethod.value,
              userId: id,
            };

            const sendOtpService = await sendOtp(reqBody);

            if (sendOtpService.status === 200) {
              handleOpen();
            } else {
              alert('Signup failed! Try again');
              window.location.reload();
            }
          } else {
            alert('Plese contact with HR for your signup approval!');
          }
        } else {
          console.log(response);
          alert('Signup failed! Try again later');
        }

        // navigate('/login', { replace: true });
      } catch (err) {
        alert('Signup failed! Try again later');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          name="id"
          label="ID"
          autoComplete="given-name"
          onChange={(e) => onValueChange(e)}
          className="hover-hint"
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Sign up
        </LoadingButton>
      </Stack>

      <Dialog
        style={{ textAlign: 'center' }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'OTP VERIFICATIONS'}</DialogTitle>
        <DialogContent>
          <DialogContentText>A code has been sent to your official email provided by Remark HB.</DialogContentText>

          <DialogContentText style={{ color: 'crimson', margin: '15px' }}>
            Please enter the code to verify your signup.
          </DialogContentText>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> </span>}
            inputType="tel"
            containerStyle={{ display: 'unset' }}
            inputStyle={{ width: '3rem', height: '3.5rem' }}
            renderInput={(props) => <input {...props} className="otp-input" />}
          />

          <DialogContentText style={{ margin: '5px' }}>
            Didn't get the code? <span style={{ color: 'crimson' }}>Resend</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton autoFocus onClick={onVerify}>
            Verify
          </LoadingButton>
          <LoadingButton onClick={handleClose} autoFocus>
            Cancel
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
