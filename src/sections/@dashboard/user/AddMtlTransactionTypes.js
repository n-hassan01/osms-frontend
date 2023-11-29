import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMtlTransactionTypes } from '../../../Services/Admin/AddMtlTransactionTypes';
import Iconify from '../../../components/iconify';

export default function AddMtlTransactionTypes() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}-${day}-${year}`;

  const transactionDetails = {
    lastUpdateDate: '',
    lastUpdatedBy: '',
    creationDate: formattedDate,
    createdBy: '',
    transactionTypeName: '',
    description: '',
    transactionActionId: '',
    transactionSourceTypeId: '',
  };
  const [transaction, setTransaction] = useState(transactionDetails);

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
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      const response = await addMtlTransactionTypes(transaction);
      console.log('Pass to home after request ');
      handleClose();
      navigate('/showmtltransactiontypes');
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
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        New Transaction
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Add New Organization'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              type="date"
              name="lastUpdateDate"
              label={sentenceCase('Last Update Date')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.lastUpdateDate}
              helperText={errors.lastUpdateDate}
              InputLabelProps={{
                shrink: true,
              }}
              value={transaction.lastUpdateDate}
            />

            <TextField
              required
              name="lastUpdatedBy"
              label="Last Updated By"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.lastUpdatedBy}
              helperText={errors.lastUpdatedBy}
            />

            <TextField
              required
              name="createdBy"
              label="Created By"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.createdBy}
              helperText={errors.createdBy}
            />

            <TextField
              required
              name="transactionTypeName"
              label="Transaction Type Name"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
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
              name="transactionActionId"
              label="Transaction Action Id"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              required
              name="transactionSourceTypeId"
              label="Transaction Source Type Id"
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
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
