/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { sentenceCase } from 'change-case';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPerAllPeopleService } from '../../../Services/Admin/AddPerAllPeople';
import { getperPerAllPeoplesService } from '../../../Services/Admin/GetperPerAllPeoples';

export default function AddPerAllPeoples() {
  const navigate = useNavigate();
  const { person_id } = useParams();
  const [open, setOpen] = useState(false);
  const [showMenuLines, setShowMenuLines] = useState(!(person_id === 'null'));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // const [people, setPeople] = useState([
  //   {
  //     effectiveStartDate: '',
  //     effectiveEndDate: '',
  //     businessGroupId: '',
  //     workTelephone: '',
  //     employeeNumber: '',

  //     fullName: '',

  //     emailAddress: '',

  //     originalDateOfHire: '',
  //   },
  // ]);
  const [people, setPeople] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('with brackets', { person_id });
        console.log('without', typeof person_id);

        console.log(typeof person_id);
        if (person_id !== 'null') {
          const result = await getperPerAllPeoplesService(parseInt(person_id, 10));

          setPeople(result.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

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
      console.log('clone', people.person_id);
console.log(people);
      const filteredArray = people.filter((item) => Object.values(item).some((value) => value !== ''));

      let c;
      for (c = 0; c < filteredArray.length; c++) {
        const lineInfo = filteredArray[c];
        console.log('line info ', lineInfo);
        if (person_id === 'null' || lineInfo.person_id === '') {
          const requestBody = {
            effectiveStartDate: lineInfo.effective_start_date,
            effectiveEndDate: lineInfo.effective_end_date,
            businessGroupId: lineInfo.business_group_id,
            workTelephone: lineInfo.work_telephone,
            employeeNumber: lineInfo.employee_number,

            fullName: lineInfo.full_name,

            emailAddress: lineInfo.email_address,

            originalDateOfHire: lineInfo.original_date_of_hire,
          };

          const response = await addPerAllPeopleService(requestBody);
          console.log('Pass to home after request ');
          handleClose();
        } else {
          const requestBody = {
            effectiveStartDate: lineInfo.effective_start_date,
            effectiveEndDate: lineInfo.effective_end_date,
            businessGroupId: lineInfo.business_group_id,
            workTelephone: lineInfo.work_telephone,
            employeeNumber: lineInfo.employee_number,

            fullName: lineInfo.full_name,

            emailAddress: lineInfo.email_address,

            originalDateOfHire: lineInfo.original_date_of_hire,
          };
          console.log(requestBody);
          const response = await axios.put(
            `http://182.160.114.100:5001/update-per-all-peoples/${person_id}`,
            requestBody
          );
          console.log('Pass to home after request ');
          //  handleClose();
        }
      }
     // setPeople([]);
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
          effective_start_date: '',
          effective_end_date: '',
          business_group_id: '',
          work_telephone: '',
          employee_number: '',

          full_name: '',

          email_address: '',

          original_date_of_hire: '',
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
                            name="effective_start_date"
                            label={sentenceCase('effective_start_date')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.effective_start_date}
                            helperText={errors.effective_start_date}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // value={row.effective_start_date}
                          />
                        </td>
                        <td style={{ width: '150px' }}>
                          <TextField
                            type="date"
                            name="effective_end_date"
                            label={sentenceCase('effective_end_date')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.effective_end_date}
                            helperText={errors.effective_end_date}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // value={row.effective_end_date}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="business_group_id"
                            value={row.business_group_id}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="work_telephone"
                            value={row.work_telephone}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="employee_number"
                            value={row.employee_number}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="full_name"
                            value={row.full_name}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '350px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="email_address"
                            value={row.email_address}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>

                        <td style={{ width: '150px' }}>
                          <TextField
                            type="date"
                            name="original_date_of_hire"
                            label={sentenceCase('original_date_of_hire')}
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                            error={!!errors.original_date_of_hire}
                            helperText={errors.original_date_of_hire}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            //  value={row.original_date_of_hire}
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
