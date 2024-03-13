import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// component
import Iconify from '../../../components/iconify';
import { approveBankDepositService, rejectBankDepositService } from '../../../Services/ApiServices';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedUsers: PropTypes.array,
  enableDelete: PropTypes.bool,
  user: PropTypes.object,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, selectedUsers, enableDelete, user }) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  const onValueChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const deleteSelectedUser = async () => {
  //   setReject(true);
  //   try {
  //     const approvalPromises = selectedUsers.map(async (element) => {
  //       const requestBody = {
  //         action: 'REJECTED',
  //         cashReceiptId: element,
  //       };
  //       const response = await approveBankDepositService(user, requestBody);

  //       const rejectRequestBody = {
  //         rejectReason: 'REJECTED',
  //         cashReceiptId: element,
  //       };
  //       const rejectResponse = await approveBankDepositService(user, rejectRequestBody);
  //     });

  //     await Promise.all(approvalPromises);

  //     console.log('Successfully rejected!');
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error during deposit approval:', error);
  //   }
  // };

  const rejectDeposits = async () => {
    try {
      const approvalPromises = selectedUsers.map(async (element) => {
        const requestBody = {
          action: 'REJECTED',
          cashReceiptId: element,
        };
        const response = await approveBankDepositService(user, requestBody);

        const rejectRequestBody = {
          rejectReason: rowData.reason,
          cashReceiptId: element,
        };
        const rejectResponse = await rejectBankDepositService(user, rejectRequestBody);
      });

      await Promise.all(approvalPromises);

      console.log('Successfully rejected!');
      window.location.reload();
    } catch (error) {
      console.error('Error during deposit approval:', error);
    }
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search deposit..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {enableDelete && numSelected > 0 ? (
        <Tooltip title="Reject" style={{ color: 'crimson' }}>
          <IconButton onClick={handleClickOpen}>
            <Iconify icon="eva:trash-2-fill" />
            <span style={{ fontSize: '20px' }}>Reject</span>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}

      {/* {reject && ( */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: 'crimson' }}>Are you sure to reject the deposits?</DialogTitle>
        <Stack />
        <DialogContent>
          <Stack spacing={1} direction="row" alignItems="center">
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%' }}>
              {/* <label htmlFor="reason">Reason: </label> */}
              <textarea
                id="reason"
                name="reason"
                placeholder="Specify a reason for your rejection.."
                style={{ width: '100%' }}
                value={rowData.reason}
                onChange={(e) => onValueChange(e)}
              />
            </div>
          </Stack>

          <Grid container spacing={2} style={{ marginTop: '5px' }}>
            <Grid item xs={3} style={{ display: 'flex' }}>
              <Button
                style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                onClick={rejectDeposits}
              >
                Submit
              </Button>
              <Button
                style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* )} */}
    </StyledRoot>
  );
}
