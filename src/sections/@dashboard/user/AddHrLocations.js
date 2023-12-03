/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { ButtonGroup, Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
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
  const [showMenuLines, setShowMenuLines] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [location, setLocation] = useState([
    {
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
    },
  ]);
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

  const handleMenuChange = (index, name, value) => {
    const updatedRows = [...location];
    updatedRows[index][name] = value;
    setLocation(updatedRows);
    console.log(location);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [count, setCount] = useState(0);
  const handleClick = async () => {
    try {
      console.log('loki', location);

      const filteredArray = location.filter((item) => Object.values(item).some((value) => value !== ''));

      let c;
      for (c = 0; c < filteredArray.length; c++) {
        const lineInfo = filteredArray[c];

        const requestBody = {
          locationCode: lineInfo.locationCode,
          businessGroupId: '5',
          description: lineInfo.description,
          shipToLocationId: '3',
          inventoryOrganizationId: '4',
          addressLine1: lineInfo.addressLine1,
          addressLine2: lineInfo.addressLine2,
          addressLine3: lineInfo.addressLine3,
          townOrCity: lineInfo.townOrCity,
          country: lineInfo.country,
          postalCode: lineInfo.postalCode,
          telephoneNumber1: lineInfo.telephoneNumber1,
          telephoneNumber2: '01533581070 ',
          telephoneNumber3: '01533581070',
          lastUpdateDate: '08-08-2023',
          lastUpdatedBy: '1',
          createdBy: '2',
          creationDate: '07-08-2023',
        };

        const response = await addHrLocationsDetailsService(requestBody);
        console.log('Pass to home after request ');
        handleClose();
      }
      setLocation([]);
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };
  const handleAddRow = () => {
    setLocation([
      ...location,
      {
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
      },
    ]);
    console.log(location);
  };

  const handleClose = () => {
    navigate('/showlocationsall');

    window.location.reload();
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
        <Grid item xs={3}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                setShowMenuLines(true);
              }}
            >
              Add Location
            </Button>

            <Button onClick={handleClose}>Cancel</Button>
          </ButtonGroup>
        </Grid>

        <div>
          <form className="form-horizontal" style={{ marginTop: '5%' }}>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-highlight">
                <thead>
                  <tr>
                    <th>
                      Location Code <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Description <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Address Line1 <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Address Line2 <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Address Line3 <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Town Or City <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Country <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Postal Code <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Telephone Number1 <span style={{ color: 'red' }}>*</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showMenuLines &&
                    location.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="locationCode"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="description"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="addressLine1"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="addressLine2"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="addressLine3"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="townOrCity"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="country"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="postalCode"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="telephoneNumber1"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <Button>
                            <AddIcon onClick={handleAddRow} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {showMenuLines && (
              <Grid item xs={3}>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  spacing={2}
                  style={{ marginTop: '20px' }}
                >
                  <Button style={{ marginRight: '10px' }} onClick={handleClick}>
                    Submit
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </ButtonGroup>
              </Grid>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
}
