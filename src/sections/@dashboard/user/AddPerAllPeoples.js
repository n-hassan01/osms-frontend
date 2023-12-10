/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sentenceCase } from 'change-case';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPerAllPeopleService } from '../../../Services/Admin/AddPerAllPeople';



export default function AddPerAllPeoples() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showMenuLines, setShowMenuLines] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [people, setPeople] = useState([
    {
      effectiveStartDate: '',
      effectiveEndDate: '',
      businessGroupId: '',
      workTelephone: '',
      employeeNumber: '',

      fullName: '',

      emailAddress: '',

      originalDateOfHire: '',
    },
  ]);

  const handleMenuChange = (index, name, value) => {
    const updatedRows = [...people];
    updatedRows[index][name] = value;
    setPeople(updatedRows);
    console.log(people);
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

  const onValueChange = (e) => {
    setPeople({ ...people, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      const filteredArray = people.filter((item) => Object.values(item).some((value) => value !== ''));

      let c;
      for (c = 0; c < filteredArray.length; c++) {
        const lineInfo = filteredArray[c];

        const requestBody = {
          effectiveStartDate: lineInfo.effectiveStartDate,
          effectiveEndDate: lineInfo.effectiveEndDate,
          businessGroupId: lineInfo.businessGroupId,
          workTelephone: lineInfo.workTelephone,
          employeeNumber: lineInfo.employeeNumber,

          fullName: lineInfo.fullName,

          emailAddress: lineInfo.emailAddress,

          originalDateOfHire: lineInfo.originalDateOfHire,
        };

        const response = await addPerAllPeopleService(requestBody);
        console.log('Pass to home after request ');
        handleClose();
      }
      setPeople([]);
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };

  const handleAddRow = () => {
    if (people.length === 1) setShowMenuLines(true);

    if (showMenuLines) {
      setPeople([
        ...people,
        {
          effectiveStartDate: '',
          effectiveEndDate: '',
          businessGroupId: '',
          workTelephone: '',
          employeeNumber: '',

          fullName: '',

          emailAddress: '',

          originalDateOfHire: '',
        },
      ]);
      console.log(people);
    }
  };

  const handleClose = () => {
    navigate('/dashboard/showperallpeoples');
    window.location.reload();
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            PerAllPeoples Add
          </Typography>
        </Stack>

        <Grid item xs={3}>
          <Button
            style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
            onClick={() => {
              handleAddRow();
            }}
          >
            Add PerAllPeoples
          </Button>

          <Button
            style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>

        <div>
          <form className="form-horizontal" style={{ marginTop: '5%' }}>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-highlight">
                <thead>
                  <tr>
                    <th>
                    Effective Start Date <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Effective End Date <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Business Group Id <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Work Telephone <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Employee Number <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Full Name <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Email Address <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                    Original Date Of Hire <span style={{ color: 'red' }}>*</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showMenuLines &&
                    people.map((row, index) => (
                      <tr key={index}>
                        <td style={{ width: '190px' }}>
                          <TextField
                            type="date"
                            name="effectiveStartDate"
                            label={sentenceCase('effectiveStartDate')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.effectiveStartDate}
                            helperText={errors.effectiveStartDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={people.effectiveStartDate}
                          />
                        </td>
                        <td style={{ width: '150px' }}>
                          <TextField
                            type="date"
                            name="effectiveEndDate"
                            label={sentenceCase('effectiveEndDate')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.effectiveEndDate}
                            helperText={errors.effectiveEndDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={people.effectiveEndDate}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="businessGroupId"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="workTelephone"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="employeeNumber"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="emailAddress"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                      
                        <td style={{ width: '150px' }}>
                          <TextField
                            type="date"
                            name="originalDateOfHire"
                            label={sentenceCase('originalDateOfHire')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.originalDateOfHirey}
                            helperText={errors.originalDateOfHirey}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={people.originalDateOfHirey}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {showMenuLines && (
              <Grid item xs={3}>
                <Button
                  style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                  onClick={handleClick}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            )}
          </form>
        </div>
      </Container>

    
    </div>
  );
}
