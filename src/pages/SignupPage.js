import Link from "@mui/material/Link";
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
// components
// sections
import SignupForm from '../sections/auth/login/SignupForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    backgroundColor: 'gainsboro',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  backgroundColor: 'white',
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Signup </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm" style={{backgroundColor: 'white'}}>
          <StyledContent>
            <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
              Welcome to Chowdhury's Blog
            </Typography>

            <SignupForm />

            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" target="_blank" href="https://n-hassan01.github.io/PortfolioWebsite/">
                Naimul Hassan
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
