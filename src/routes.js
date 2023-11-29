import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ImageGallary from './pages/ImageGallary';
import LoginPage from './pages/LoginPage';
import MtlSystemItemPage from './pages/MtlSystemItemPage';
import MtlUnitMeasurePage from './pages/MtlUnitMeasurePage';
import Page404 from './pages/Page404';
import PortfolioPage from './pages/PortfolioPage';
import ProfilePage from './pages/ProfilePage';
import RequisitionFormPage from './pages/RequisitionFormPage';
import SettingsPage from './pages/SettingsPage';
import ShowHrAllOrganizationUnits from './pages/ShowHrAllOrganizationUnits';
import ShowLocationsAll from './pages/ShowLocationsAll';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';
// import getCookieService from './Services/GetCookieService';
import { getUserProfileDetails } from './Services/ApiServices';
// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  // const cookie = getCookieService('jwt-token-cookie');
  // console.log(cookie);
  const [isAuthorized, setIsAuthorized] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getUserProfileDetails(); // Call your async function here
        if (accountDetails.status === 200) setIsAuthorized(accountDetails.status === 200);
        else navigate('/login');
        // if (accountDetails.status === 200) setAccount(accountDetails.data); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  
  const routes = useRoutes([
    {
      path: '/dashboard',
      // element: <DashboardLayout />,
      element: isAuthorized ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'items', element: <MtlSystemItemPage /> },
        { path: 'uom', element: <MtlUnitMeasurePage /> },
        { path: 'requisition', element: <RequisitionFormPage /> },
        { path: 'showlocationsall', element: <ShowLocationsAll /> },
        { path: 'showorganizationunits', element: <ShowHrAllOrganizationUnits /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'user',
      element: <UserPage />,
    },
    {
      path: 'uom',
      // element: <MtlUnitMeasurePage />,
      element: isAuthorized ? <MtlUnitMeasurePage /> : <Navigate to="/login" />,
    },
    {
      path: 'items',
      // element: <MtlSystemItemPage />,
      element: isAuthorized ? <MtlSystemItemPage /> : <Navigate to="/login" />,
    },
    {
      path: 'requisition',
      // element: <RequisitionFormPage />,
      element: isAuthorized ? <RequisitionFormPage /> : <Navigate to="/login" />,
    },
    {
      path: 'showlocationsall',
      // element: <ShowLocationsAll />,
      element: isAuthorized ? <ShowLocationsAll /> : <Navigate to="/login" />,
    },
    {
      path: 'showorganizationunits',
      // element: <ShowHrAllOrganizationUnits />,
      element: isAuthorized ? <ShowHrAllOrganizationUnits /> : <Navigate to="/login" />,
    },
    {
      path: 'imagegallary',
      element: <ImageGallary />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
