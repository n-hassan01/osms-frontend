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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPerHrLocationsDetailsService } from '../../../Services/Admin/GetPerHrLocation';
import { updateHrLocationsService } from '../../../Services/Admin/UpdateHrLocations';
import Iconify from '../../../components/iconify';

export default function UpdateHrLocations({ location_id }) {
  const navigate = useNavigate();
  console.log('update page ', location_id);
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

  // const onValueChange = (e) => {
  //   setLocation({ ...location, [e.target.name]: e.target.value });
  // };

  const handleClickOpen = () => {
    
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', { location_id });
    console.log('without', location_id);
    const result = await getPerHrLocationsDetailsService({ location_id });
    console.log('Eiii', result.data[0].location_id, result.data[0].location_code, result.data[0].description,result.data[0].postal_code);
    setLocation({
      ...location,
      locationId: result.data[0].location_id,
      locationCode: result.data[0].location_code,
      description: result.data[0].description,
      addressLine1: result.data[0].address_line_1,
      addressLine2: result.data[0].address_line_2,
      addressLine3: result.data[0].address_line_3,
      townOrCity: result.data[0].town_or_city,
      country: result.data[0].country,
      postalCode: result.data[0].postal_code,
      telephoneNumber1: result.data[0].telephone_number_1,
    });

    console.log("location Details",locationsDetails);
  };

  const handleClick = async () => {
    try {
      console.log(locationsDetails);
      const response = await updateHrLocationsService(locationsDetails);
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
        Update
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              required
              name="locationId"
              label="Location ID"
             
              
              value={location.locationId}
              onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />
            <TextField
              required
              name="locationCode"
              label="Location Code"
              
              
              value={location.locationCode}
              onChange={(e) => setLocation({ ...location, locationCode: e.target.value })}
            />
            <TextField
              required
              name="description"
              label="Description"
             
              
              value={location.description}
              onChange={(e) => setLocation({ ...location, description: e.target.value })}
            />

            <TextField
              required
              name="addressLine1"
              label="Address Line1"
            
             
              value={location.addressLine1}
              onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
            />
            <TextField
              name="addressLine2"
              label="Address Line2"
              
           
              value={location.addressLine2}
              onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
            <TextField
              name="addressLine3"
              label="Address Line3"
           
              
              value={location.addressLine3}
              onChange={(e) => setLocation({ ...location, addressLine3: e.target.value })}
            />
            <TextField
              required
              name="townOrCity"
              label="Town Or City"
              
         
              value={location.townOrCity}
              onChange={(e) => setLocation({ ...location, townOrCity: e.target.value })}
            />
            <TextField
              required
              name="country"
              label="Country"
     
      
              value={location.country}
              onChange={(e) => setLocation({ ...location, country: e.target.value })}
            />
            <TextField
              required
              name="postalCode"
              label="Postal Code"
       
        
              value={location.postalCode}
              onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
            />
            <TextField
              required
              name="telephoneNumber1"
              label="Telephone Number1"
            
            
              value={location.telephoneNumber1}
              onChange={(e) => setLocation({ ...location, telephoneNumber1: e.target.value })}
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
