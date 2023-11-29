/* eslint-disable no-undef */
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sentenceCase } from 'change-case';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFndUserService } from '../../../Services/Admin/AddFndUser';
import Iconify from '../../../components/iconify';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const fndUserDetails = {
    userName: '',
    userPassword: '',
    startDate: '',
    endDate: '',
    description: '',
    employeeId: '',
  };

  const [fnduser, setFnduser] = useState(fndUserDetails);

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
    setFnduser({ ...fnduser, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      console.log(fnduser);
      const response = await addFndUserService(fnduser);
      console.log('Pass to home after request ');
      handleClose();
      navigate('/showfnduser');
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        New User
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              required
              name="userName"
              label="User Name"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              required
              name="userPassword"
              label="User Password"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type="date"
              name="startDate"
              label={sentenceCase('startDate')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.startDate}
              helperText={errors.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              value={fnduser.startDate}
            />

            <TextField
              type="date"
              name="endDate"
              label={sentenceCase('endDate')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.endDate}
              helperText={errors.endDate}
              InputLabelProps={{
                shrink: true,
              }}
              value={fnduser.endDate}
            />
            <TextField
              name="description"
              label="Description"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              name="employeeId"
              label="Employee ID"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClick}>
            Submit
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
