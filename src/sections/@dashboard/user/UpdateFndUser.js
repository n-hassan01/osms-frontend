/* eslint-disable import/named */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPerFndUserService } from '../../../Services/Admin/GetPerFndUser';
import Iconify from '../../../components/iconify';

export default function UpdateHrLocations({ user_id }) {
  const navigate = useNavigate();
  console.log('update page person', user_id);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [fnduser, setFnduser] = useState({
    userName: '',
    userPassword: '',
    startDate: '',
    endDate: '',
    description: '',
    employeeId: '',
  });

  const onValueChange = (e) => {
    setFnduser({ ...fnduser, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', { user_id });
    console.log('without', user_id);
    const result = await getPerFndUserService(user_id);
    console.log('Eiii', result.data[0].user_id);
    setFnduser({
      ...fnduser,
      userName: result.data[0].user_name,
      userPassword: result.data[0].user_password,
      startDate: result.data[0].start_date,
      endDate: result.data[0].end_date,
      description: result.data[0].description,
      employeeId: result.data[0].employee_id,
    });
  };

  const handleClick = async () => {
    try {
      console.log('loc', fnduser);
      const response = await axios.put(`http://localhost:5001/update-fnd-user/${user_id}`, fnduser);

      console.log('Pass to home after request ');
      handleClose();
      navigate('/showfnduser');
      window.location.reload();
    } catch (err) {
      console.log(err.message.TextField);
      alert('Process failed! Try again later');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              type={'text'}
              name="user_id"
              label="User Id"
              value={user_id}

              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />
            <TextField
              type={'text'}
              name="userName"
              label="User Name"
              value={fnduser.userName}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
            />

            <TextField
              type={'text'}
              name="userPassword"
              label="User Password"
              value={fnduser.userPassword}
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type={'text'}
              name="  startDate"
              label="  Start Date"
              value={fnduser.startDate}
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type={'text'}
              name="  endDate"
              label="  End Date"
              value={fnduser.endDate}
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type={'text'}
              name="description"
              label="Description"
              value={fnduser.description}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="employeeId"
              label="Employee ID"
              value={fnduser.employeeId}
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
