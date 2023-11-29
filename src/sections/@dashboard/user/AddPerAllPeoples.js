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
import { addPerAllPeopleService } from '../../../Services/Admin/AddPerAllPeople';
import Iconify from '../../../components/iconify';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const peopleDetails = {
    effectiveStartDate: '',
    effectiveEndDate: '',
    businessGroupId: '',
    workTelephone: '',
    employeeNumber: '',

    fullName: '',

    emailAddress: '',

    originalDateOfHire: '',
  };

  const [people, setPeople] = useState(peopleDetails);

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
    setPeople({ ...people, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      console.log(people);
      const response = await addPerAllPeopleService(people);
      console.log('Pass to home after request ');
      handleClose();
      navigate('/showperallpeoples');
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
        New People
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              type="date"
              name="effectiveStartDate"
              label={sentenceCase('effectiveStartDate')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.effectiveStartDate}
              helperText={errors.effectiveStartDate}
              InputLabelProps={{
                shrink: true,
              }}
              value={people.effectiveStartDate}
            />

            <TextField
              type="date"
              name="effectiveEndDate"
              label={sentenceCase('effectiveEndDate')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.effectiveEndDate}
              helperText={errors.effectiveEndDate}
              InputLabelProps={{
                shrink: true,
              }}
              value={people.effectiveEndDate}
            />

            <TextField
              required
              name="businessGroupId"
              label="Business Group ID"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              required
              name="workTelephone"
              label="Work Telephone"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              name="employeeNumber"
              label="Employee Number"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField name="fullName" label="Full Name" autoComplete="given-name" onChange={(e) => onValueChange(e)} />
            <TextField
              required
              name="emailAddress"
              label="Email Address"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type="date"
              name="originalDateOfHire"
              label={sentenceCase('originalDateOfHire')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.originalDateOfHirey}
              helperText={errors.originalDateOfHirey}
              InputLabelProps={{
                shrink: true,
              }}
              value={people.originalDateOfHirey}
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
