import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHrLocationsDetailsService } from '../../../Services/Admin/AddHrLocations';
import Iconify from '../../../components/iconify';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const locationsDetails = {
    locationId: '',
    locationCode: '',
    businessGroupId: '5',
    description: '',
    shipToLocationId: '3',
    inventoryOrganizationId: '4',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townOrCity: '',
    country: '',
    postalCode: '',
    telephoneNumber1: '',
    telephoneNumber2: '01533581070 ',
    telephoneNumber3: '01533581070',
    lastUpdateDate: '08-08-2023',
    lastUpdatedBy: '1',
    createdBy: '2',
    creationDate: '07-08-2023',
  };
  const [location, setLocation] = useState(locationsDetails);

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
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      console.log(location);
      const response = await addHrLocationsDetailsService(location);
      console.log('Pass to home after request ');
      handleClose();
      navigate('/showlocationsall');
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
        New Location
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              required
              name="locationId"
              label="Location ID"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="locationCode"
              label="Location Code"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              required
              name="description"
              label="Description"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />

            <TextField
              required
              name="addressLine1"
              label="Address Line1"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              name="addressLine2"
              label="Address Line2"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              name="addressLine3"
              label="Address Line3"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="townOrCity"
              label="Town Or City"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="country"
              label="Country"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="postalCode"
              label="Postal Code"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="telephoneNumber1"
              label="Telephone Number1"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
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
