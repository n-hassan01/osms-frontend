/* eslint-disable react/prop-types */
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

import { getPerAllMtlTransactionTypesService } from '../../../Services/Admin/GetPerAllMtlTransactionTypes';
import Iconify from '../../../components/iconify';

export default function UpdateMtlTransactionTypes({ transaction_type_id }) {
  const navigate = useNavigate();
  console.log('update page ', transaction_type_id);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const currentDate = new Date();

  // Extract the date components
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  const [transaction, setTransaction] = useState({
    transactionTypeId:'',
    lastUpdateDate: '',
    lastUpdatedBy: '',
    creationDate: formattedDate,
    createdBy: '',
    transactionTypeName: '',
    description: '',
    transactionActionId: '',
    transactionSourceTypeId: '',
  });

  const onValueChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    loadUser();
  };
  const loadUser = async () => {
    console.log('with brackets update', { transaction_type_id });
    console.log('without', transaction_type_id);
    const result = await getPerAllMtlTransactionTypesService(transaction_type_id);
    // const dateTimeString1 = result.data[0].date_from;
    // const datefrom = dateTimeString1.split('T')[0];
    // const dateTimeString2 = result.data[0].date_to;
    // const dateto = dateTimeString2.split('T')[0];
    

    setTransaction({
      ...transaction,
      transactionTypeId:result.data[0].transaction_type_id,
      lastUpdateDate: result.data[0].last_update_date,
     
      lastUpdatedBy: result.data[0].last_updated_by,
      creationDate: result.data[0].creation_date,
      createdBy: result.data[0].created_by,

  
      transactionTypeName: result.data[0].transaction_type_name,
      description: result.data[0].description,
      transactionActionId: result.data[0].transaction_action_id,
      transactionSourceTypeId: result.data[0].transaction_source_type_id,
    });

    console.log('transaction Details', transaction);
  };

  const handleClick = async () => {
    try {
      console.log('loc', transaction);
      const response = await axios.put(
        `http://localhost:5001/update-mtl-transaction-types/${transaction.transactionTypeId}`,
        transaction
      );

      console.log('Pass to home after request ');
      handleClose();
      navigate('/showmtltransactiontypes');
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
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Locations'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              type={'text'}
              name="transactionTypeId"
              label="Transaction Type Id"
              value={transaction.transactionTypeId}
              // onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />
            <TextField
              type={'text'}
              name="lastUpdateDate"
              label="Last Update Date "
              value={transaction.lastUpdateDate}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationCode: e.target.value })}
            />
            <TextField
              type={'text'}
              name="lastUpdatedBy"
              label="Last Updated By"
              value={transaction.lastUpdatedBy}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, locationId: e.target.value })}
            />

            <TextField
              type={'text'}
              name="creationDate"
              label="Creation Date"
              value={transaction.creationDate}
             // onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, description: e.target.value })}
            />

            <TextField
              type={'text'}
              name="createdBy"
              label="Created By"
              value={transaction.createdBy}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
            />
            <TextField
              type={'text'}
              name="transactionTypeName"
              label="Transaction Type Name"
              value={transaction.transactionTypeName}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
            <TextField
              type={'text'}
              name="description"
              label="Description"
              value={transaction.description}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
            <TextField
              type={'text'}
              name="transactionActionId"
              label="Transaction Action Id"
              value={transaction.transactionActionId}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />
            <TextField
              type={'text'}
              name="transactionSourceTypeId"
              label="Transaction Source Type Id"
              value={transaction.transactionSourceTypeId}
              onChange={(e) => onValueChange(e)}
              // onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
            />

            
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
