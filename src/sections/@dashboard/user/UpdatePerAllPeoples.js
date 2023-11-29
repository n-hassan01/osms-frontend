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
import { getperPerAllPeoplesService } from '../../../Services/Admin/GetperPerAllPeoples';
import Iconify from '../../../components/iconify';

export default function UpdateHrLocations({ person_id }) {
  const navigate = useNavigate();
  console.log('update page person', person_id);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [people, setPeople] = useState({
    effectiveStartDate: '',
    effectiveEndDate: '',
    businessGroupId: '',
    workTelephone: '',
    employeeNumber: '',

    fullName: '',

    emailAddress: '',

    originalDateOfHire: '',
  });

  const onValueChange = (e) => {
    setPeople({ ...people, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', { person_id });
    console.log('without', person_id);
    const result = await getperPerAllPeoplesService(person_id);
    console.log('Eiii', result.data[0].person_id);
    setPeople({
      ...people,
      effectiveStartDate: result.data[0].effective_start_date,
      effectiveEndDate: result.data[0].effective_end_date,
      businessGroupId: result.data[0].business_group_id,
      employeeNumber: result.data[0].employee_number,
      workTelephone: result.data[0].work_telephone,
      fullName: result.data[0].full_name,
      emailAddress: result.data[0].email_address,
      originalDateOfHire: result.data[0].original_date_of_hire,
    });
  };

  const handleClick = async () => {
    try {
      console.log('loc', people);
      const response = await axios.put(`http://localhost:5001/update-per-all-peoples/${person_id}`, people);

      console.log('Pass to home after request ');
      handleClose();
      navigate('/showperallpeoples');
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
            <TextField type={'text'} name="personId" label="Person Id" value={person_id} />
            <TextField
              type={'text'}
              name="effectiveStartDate"
              label="Effective Start Date"
              value={people.effectiveStartDate}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="effectiveEndDate"
              label="Effective End Date"
              value={people.effectiveEndDate}
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              type={'text'}
              name="businessGroupId"
              label="Business Group Id"
              value={people.businessGroupId}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="emailAddress"
              label="Email Address"
              value={people.emailAddress}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="employeeNumber"
              label="Employee Number"
              value={people.employeeNumber}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="workTelephone"
              label="Work Telephone"
              value={people.workTelephone}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              type={'text'}
              name="fullName"
              label="Full Name"
              value={people.fullName}
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              name="originalDateOfHire"
              label="Original Date Of Hire"
              value={people.originalDateOfHire}
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
