import { ButtonGroup, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHrLocationsDetailsService } from '../../../Services/Admin/AddHrLocations';

export default function AddHrLocations() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const locationsDetails = {
   
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
   
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Location Add
          </Typography>
        </Stack>

        <Grid container spacing={2} style={{ marginTop: '10px' }}>
        
          <Grid item xs={2}>
            <TextField
              required
              name="locationCode"
              label="Location Code"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="description"
              label="Description"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="addressLine1"
              label="Address Line1"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="addressLine2"
              label="Address Line2"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="addressLine3"
              label="Address Line3"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="townOrCity"
              label="Town Or City"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="country"
              label="Country"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="postalCode"
              label="Postal Code"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              name="telephoneNumber1"
              label="Telephone Number1"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
          </Grid>

        
            <Grid item xs={2}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
            <Button autoFocus onClick={handleClick}>
              Submit
            </Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            </ButtonGroup>
            </Grid>
            
        </Grid>
      </Container>
    </div>
  );
}
