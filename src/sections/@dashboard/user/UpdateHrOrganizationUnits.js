/* eslint-disable react/prop-types */
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

import { getPerHrOrganizationUnitsService } from '../../../Services/Admin/GetPerHrOrganizationUnits';
import Iconify from '../../../components/iconify';

export default function UpdateHrOrganizationUnits({ organization_id }) {
  const navigate = useNavigate();
  console.log('update page ', organization_id);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [organization, setOrganization] = useState({
    organizationId: '',
    businessGroupId: '',
    locationId: '',

    dateFrom: '',
    name: '',
    dateTo: '',

    lastUpdateDate: '08-08-2023',
    lastUpdatedBy: '1',
    createdBy: '2',
    creationDate: '07-08-2023',
  });

  const onValueChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', { organization_id });
    console.log('without', organization_id);
    const result = await getPerHrOrganizationUnitsService(organization_id);
    const dateTimeString1 = result.data[0].date_from;
    const datefrom = dateTimeString1.split('T')[0];
    const dateTimeString2 = result.data[0].date_to;
    const dateto = dateTimeString2.split('T')[0];
    

    setOrganization({
      ...organization,
      organizationId: result.data[0].organization_id,
      businessGroupId: result.data[0].business_group_id,
      locationId: result.data[0].location_id,

      dateFrom: datefrom,
      name: result.data[0].name,
      dateTo: dateto,
    });

    console.log('location Details', organization);
  };

  const handleClick = async () => {
    try {
      console.log('loc', organization);
      const response = await axios.put(
        `http://localhost:5001/update-hr-organization-units/${organization.organizationId}`,
        organization
      );

      console.log('Pass to home after request ');
      handleClose();
      navigate('/showorganizationunits');
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
    // const { email, password, confirmPassword } = user;
    // const newErrors = {};

    // // Validate email
    // if (!validateEmail(email)) {
    //   newErrors.email = !email ? 'Email is required' : 'Invalid email address';
    // }

    // // Validate password
    // if (!validatePassword(password)) {
    //   newErrors.password = !password ? 'Password is required' : 'Password must be at least 6 characters long';
    // }

    // // Validate confirmPassword
    // if (password !== confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    // }

    // // Check if there are any errors
    // if (Object.keys(newErrors).length === 0) {
    //   try {
    //     const response = await signup(user);

    //     if (response.status === 200) {
    //       alert('Successfully added!');
    //     } else {
    //       console.log(response);
    //       alert('Process failed! Try again later');
    //     }

    //     handleClose();
    //     navigate('/dashboard/user', { replace: true });
    //     window.location.reload();
    //   } catch (err) {
    //     console.log(err.message);
    //     alert('Process failed! Try again later');
    //   }
    // } else {
    //   setErrors(newErrors);
    // }
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
              name="organizationId"
              label="Organization ID"
              value={organization.organizationId}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />
            <TextField
              type={'text'}
              name="businessGroupId"
              label="Business Group Id "
              value={organization.businessGroupId}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationCode: e.target.value })}
            />
            <TextField
              type={'text'}
              name="locationId"
              label="Location ID"
              value={organization.locationId}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />

            <TextField
              type={'text'}
              name="dateFrom"
              label="Date From"
              value={organization.dateFrom}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, description: e.target.value })}
            />

            <TextField
              type={'text'}
              name="name"
              label="Name"
              value={organization.name}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
            />
            <TextField
              type={'text'}
              name="dateFrom"
              label="Date From"
              value={organization.dateFrom}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />

            {/* <TextField
              autoComplete="new-password"
              required
              name="description"
              label="Description"
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
            /> */}
            {/* <TextField
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
            /> */}
            {/* <Select
              name="role"
              placeholder="User role"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              options={options}
            /> */}
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
