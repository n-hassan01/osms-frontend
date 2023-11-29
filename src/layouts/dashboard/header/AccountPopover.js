import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// mocks_
import Logout from '../../../Services/LogoutService';
// import account from '../../../_mock/account';
// import { getAccountDetailsService } from '../../../Services/GetAccountsDetails';
import { getUserProfileDetails } from '../../../Services/ApiServices';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const [account, setAccount] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getUserProfileDetails(); // Call your async function here
        if (accountDetails.status === 200) setAccount(accountDetails.data); // Set the account details in the component's state
        else navigate('/login');
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []);
  console.log(account);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const openProfilePage = () => {
    navigate('/dashboard/profile');
    setOpen(null);
  };

  const openDashboardPage = () => {
    navigate('/dashboard');
    setOpen(null);
  };

  const openSettingsPage = () => {
    navigate('/dashboard/settings');
    setOpen(null);
  };

  const logout = () => {
    Logout();

    setOpen(null);
    navigate('/login');
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      method: openDashboardPage,
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      method: openProfilePage,
    },
    {
      label: 'Settings',
      icon: 'eva:settings-2-fill',
      method: openSettingsPage,
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={"https://us.remarkhb.com/wp-content/uploads/2022/01/remark-200x190.png"} alt="display photo" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.full_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.employee_number}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.method}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
