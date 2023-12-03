/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPerHrLocationsDetailsService } from '../../../Services/Admin/GetPerHrLocation';
import Iconify from '../../../components/iconify';

export default function UpdateHrLocations({ location_id }) {
  const navigate = useNavigate();
  console.log('update page ', location_id);
  const [open, setOpen] = useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [location, setLocation] = useState({
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
  });

  const onValueChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets', { location_id });
    console.log('without', location_id);
    const result = await getPerHrLocationsDetailsService(location_id);
    console.log(
      'Eiii',
      result.data[0].location_id,
      result.data[0].location_code,
      result.data[0].description,
      result.data[0].postal_code
    );
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

    console.log('location Details', location);
  };

  const handleClick = async () => {
    try {
      console.log('loc', location);
      const response = await axios.put(
        `http://localhost:5001/update-hr-locations-all/${location.locationId}`,
        location
      );

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
      <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Update
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      
      >
        <DialogTitle id="responsive-dialog-title">{'Update Locations'}</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '16px', width: '1200px' }}>
            <TextField
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
            />
            <DialogActions>
              <Button autoFocus onClick={handleClick}>
                Submit
              </Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
