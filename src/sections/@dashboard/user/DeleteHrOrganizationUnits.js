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

export default function DeleteHrOrganizationUnits({ organization_id }) {
  const navigate = useNavigate();
  console.log('delete page ', organization_id);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

 

  const [organization, setOrganization] = useState({
    organizationId: '',

  });

  const onValueChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', {organization_id });
    console.log('without', organization_id);
    const result = await getPerHrOrganizationUnitsService( organization_id );
   
    setOrganization({
      ...organization,
      organizationId: result.data[0].organization_id,
      
    });

    console.log('location Details', organization);
  };

  const handleClick = async () => {
    try {
      console.log('loc', organization);
      const response = await axios.delete(
        `http://localhost:5001/delete-hr-organization-units/${organization.organizationId}`
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
      <Button variant="contained" style={{backgroundColor:"red"}} startIcon={<Iconify icon="eva:minus-fill" />} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Delete Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              type={'text'}
              name="organizationId"
              label="Irganization Id"
              value={organization.organizationId}
            //   onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />
            {/* <TextField
              type={'text'}
              name="locationCode"
              label="Location Code"
              value={location.locationCode}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationCode: e.target.value })}
            />
            <TextField
              type={'text'}
              name="description"
              label="Description"
              value={location.description}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, description: e.target.value })}
            />

            <TextField
              type={'text'}
              name="addressLine1"
              label="Address Line1"
              value={location.addressLine1}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
            />
            <TextField
              type={'text'}
              name="addressLine2"
              label="Address Line2"
              value={location.addressLine2}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
            <TextField
              type={'text'}
              name="addressLine3"
              label="Address Line3"
              value={location.addressLine3}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine3: e.target.value })}
            />
            <TextField
              type={'text'}
              required
              name="townOrCity"
              label="Town Or City"
              value={location.townOrCity}
              onChange={(e) => onValueChange(e)}

              // onChange={(e) => setLocation({ ...location, townOrCity: e.target.value })}
            />
            <TextField
              name="country"
              label="Country"
              value={location.country}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, country: e.target.value })}
            />
            <TextField
              name="postalCode"
              label="Postal Code"
              value={location.postalCode}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
            />
            <TextField
              name="telephoneNumber1"
              label="Telephone Number1"
              value={location.telephoneNumber1}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, telephoneNumber1: e.target.value })}
            /> */}

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
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
