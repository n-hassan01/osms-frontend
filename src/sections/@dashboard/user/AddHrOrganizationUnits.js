/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AddIcon from '@mui/icons-material/Add';
import { ButtonGroup, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHrOrganizationUnits } from '../../../Services/Admin/AddHrOrganizationUnits';

export default function AddHrOrganizationUnits() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [showMenuLines, setShowMenuLines] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [organization, setOrganization] = useState([
    {
      businessGroupId: '',
      locationId: '',
      dateFrom: '',
      name: '',
      dateTo: '',
      lastUpdateDate: '08-28-2022',
      lastUpdatedBy: '1',
      createdBy: '2',
      creationDate: '08-28-2022',
    },
  ]);

  const handleMenuChange = (index, name, value) => {
    const updatedRows = [...organization];
    updatedRows[index][name] = value;
    setOrganization(updatedRows);
    console.log(organization);
  };

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

  // const onValueChange = (e) => {
  //   setOrganization({ ...organization, [e.target.name]: e.target.value });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {

 
      const filteredArray = organization.filter((item) => Object.values(item).some((value) => value !== ''));

      let c;
      for (c = 0; c < filteredArray.length; c++) {
        const lineInfo = filteredArray[c];

        const dateTimeString1 = lineInfo.dateFrom;
        const datefrom = dateTimeString1.split('T')[0];

        const dateTimeString2 = lineInfo.dateTo;
        const dateto = dateTimeString2.split('T')[0];

        const requestBody = {
          businessGroupId: lineInfo.businessGroupId,
          locationId: lineInfo.locationId,
          dateFrom: datefrom,
          name: lineInfo.name,
          dateTo: dateto,
          lastUpdateDate: '08-28-2022',
          lastUpdatedBy: '1',
          createdBy: '2',
          creationDate: '08-28-2022',
        };

        const response = await addHrOrganizationUnits(requestBody);
        console.log('Pass to home after request ');
        handleClose();
      }
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };
  const handleAddRow = () => {
    setOrganization([
      ...organization,
      {
        organizationId: '',
        businessGroupId: '',
        locationId: '',
        dateFrom: '',
        name: '',
        dateTo: '',
        lastUpdateDate: '08-28-2022',
        lastUpdatedBy: '1',
        createdBy: '2',
        creationDate: '08-28-2022',
      },
    ]);
    console.log(organization);
  };

  const handleClose = () => {
    navigate('/showorganizationunits');

    window.location.reload();

   setOpen(false);
  };

  return (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Organization Add
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
              Add Organization
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
                      Business Group ID <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Location ID <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Date From <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Name <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Date To <span style={{ color: 'red' }}>*</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showMenuLines &&
                    organization.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="businessGroupId"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="locationId"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td>
                          <TextField
                            type="date"
                            name="dateFrom"
                            label={sentenceCase('dateFrom')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.dateFrom}
                            helperText={errors.dateFrom}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={organization.dateFrom}
                          />
                        </td>
                        <td>
                          <input
                            style={{ width: '150px' }}
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>

                        <td>
                          <TextField
                            type="date"
                            name="dateTo"
                            label={sentenceCase('dateTo')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.dateTo}
                            helperText={errors.dateTo}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={organization.dateTo}
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
