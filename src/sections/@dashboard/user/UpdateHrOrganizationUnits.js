/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { TextField } from '@mui/material';
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">{'Update Organization '}</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '16px', width: '1200px' }}>
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
              name="dateTo"
              label="Date To"
              value={organization.dateTo}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
          </div>
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
