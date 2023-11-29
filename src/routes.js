import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Form from './pages/Form';
import ImageGallary from './pages/ImageGallary';
import LoginPage from './pages/LoginPage';
import MenuAssign from './pages/MenuAssign';
import MenuCreation from './pages/MenuCreation';
import MtlSystemItemPage from './pages/MtlSystemItemPage';
import MtlUnitMeasurePage from './pages/MtlUnitMeasurePage';
import Page404 from './pages/Page404';
import PortfolioPage from './pages/PortfolioPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ShowEmployee from './pages/ShowEmployee';
import ShowFndUser from './pages/ShowFndUser';
import ShowFormWithTable from './pages/ShowFormWithTable';
import ShowHrAllOrganizationUnits from './pages/ShowHrAllOrganizationUnits';
import ShowLocationsAll from './pages/ShowLocationsAll';
import ShowMainSystemMenu from './pages/ShowMainSystemMenu';
import ShowMenus from './pages/ShowMenus';
import ShowMtlMaterialTransactions from './pages/ShowMtlMaterialTransactions';
import ShowMtlTransactionTypes from './pages/ShowMtlTransactionTypes';
import ShowPerAllPeoples from './pages/ShowPerAllPeoples';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';









// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'contact', element: <ContactPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'uom',
      element: <MtlUnitMeasurePage />,
    },
    {
      path: 'form',
      element: <Form />,
    },
    {
      path: 'items',
      element: <MtlSystemItemPage />,
    },
    {
      path: 'showlocationsall',
      element: <ShowLocationsAll />,
    },
    {
      path: 'showmtlmaterialtransactions',
      element: <ShowMtlMaterialTransactions />,
    },
    {
      path: 'showmtltransactiontypes',
      element: <ShowMtlTransactionTypes />,
    },
    {
      path: 'showorganizationunits',
      element: <ShowHrAllOrganizationUnits />,
    },
    {
      path: 'showfnduser',
      element: <ShowFndUser />,
    },
   
    {
      path: 'menucreation',
      element: < MenuCreation/>,
    },

    {
      path: 'showmenus',
      element: <ShowMenus/>,
    },    
    {
      path: 'showmainsystemmenu',
      element: <ShowMainSystemMenu />,
    },
    {
      path: 'showperallpeoples',
      element: <ShowPerAllPeoples />,
    },
    {
      path: 'showemployee',
      element: <ShowEmployee />,
    },
    
    {
      path: 'showformwithtable',
      element: <ShowFormWithTable />,
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
      path: 'menuassign',
      element: <MenuAssign />,
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
