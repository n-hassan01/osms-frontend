import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DashClone from './pages/DashClone';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/LoginPage';
import ManageSoPage from './pages/ManageSoPage';
import MenuAssign from './pages/MenuAssign';
import MenuCreation from './pages/MenuCreation';
import MtlSystemItemPage from './pages/MtlSystemItemPage';
import MtlUnitMeasurePage from './pages/MtlUnitMeasurePage';
import Page404 from './pages/Page404';
import ProfilePage from './pages/ProfilePage';
import RequisitionFormPage from './pages/RequisitionFormPage';
import RequisitionPage from './pages/RequisitionPage';
import SalesOrderFormPage from './pages/SalesOrderFormPage';
import SettingsPage from './pages/SettingsPage';
import ShowApprovedSalesOrders from './pages/ShowApprovedSalesOrders';
import ShowExcelFile from './pages/ShowExcelFile';
import ShowFndUser from './pages/ShowFndUser';
import ShowHrAllOrganizationUnits from './pages/ShowHrAllOrganizationUnits';
import ShowHzCustAccounts from './pages/ShowHzCustAccounts';
import ShowLocationsAll from './pages/ShowLocationsAll';
import ShowMainSystemMenu from './pages/ShowMainSystemMenu';
import Showmenus from './pages/ShowMenus';
import ShowMtlMaterialTransactions from './pages/ShowMtlMaterialTransactions';
import ShowMtlTransactionTypes from './pages/ShowMtlTransactionTypes';
import ShowPerAllPeoples from './pages/ShowPerAllPeoples';
import ShowWfNotifications from './pages/ShowWfNotifications';
import SignupPage from './pages/SignupPage';
import UpdateSalesOrderForm from './pages/UpdateSalesOrderFormPage';
import WfNotificationView from './pages/WfNotificationViewPage';
import AddSystemItemsDialog from './sections/@dashboard/items/AddSystemItemsDialog';
import AddUomDialog from './sections/@dashboard/uom/AddUomDialog';
import AddFndUser from './sections/@dashboard/user/AddFndUser';
import AddHrLocations from './sections/@dashboard/user/AddHrLocations';
import AddHrOrganizationUnits from './sections/@dashboard/user/AddHrOrganizationUnits';
import AddHzCustAccounts from './sections/@dashboard/user/AddHzCustAccounts';
import AddMtlTransactionTypes from './sections/@dashboard/user/AddMtlTransactionTypes';
import AddPerAllPeoples from './sections/@dashboard/user/AddPerAllPeoples';
import UpdateFndUser from './sections/@dashboard/user/UpdateFndUser';
import UpdateHrLocations from './sections/@dashboard/user/UpdateHrLocations';
import UpdateHrOrganizationUnits from './sections/@dashboard/user/UpdateHrOrganizationUnits';
import UpdateMainSystemMenu from './sections/@dashboard/user/UpdateMainSystemMenu';
import UpdateMtlTransactionTypes from './sections/@dashboard/user/UpdateMtlTransactionTypes';
// import getCookieService from './Services/GetCookieService';
import { getUserProfileDetails } from './Services/ApiServices';
import { useUser } from './context/UserContext';

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  
  const { user } = useUser();
  console.log(user);

  const [isAuthorized, setIsAuthorized] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          console.log(user);
          const accountDetails = await getUserProfileDetails(user); // Call your async function here
          if (accountDetails.status === 200) setIsAuthorized(accountDetails.status === 200);
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);

  const routes = useRoutes([
    {
      path: '/dashboard',
      //  element: <DashboardLayout />,
      element: isAuthorized ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/dashclone" />, index: true },
        { path: 'dashclone', element: <DashClone /> },
        // { path: 'dashclone', element: <DashClone /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'items', element: <MtlSystemItemPage /> },
        { path: 'uom', element: <MtlUnitMeasurePage /> },
        { path: 'add-uom', element: <AddUomDialog /> },
        { path: 'addSystemItem/:item', element: <AddSystemItemsDialog /> },
        { path: 'requisition', element: <RequisitionFormPage /> },
        { path: 'allRequisitions', element: <RequisitionPage /> },
        { path: 'showlocationsall', element: <ShowLocationsAll /> },
        { path: 'showorganizationunits', element: <ShowHrAllOrganizationUnits /> },
        { path: 'showmtlmaterialtransactions', element: <ShowMtlMaterialTransactions /> },
        { path: 'showmtltransactiontypes', element: <ShowMtlTransactionTypes /> },
        { path: 'showmenus', element: <Showmenus /> },
        { path: 'menucreation', element: <MenuCreation /> },
        { path: 'menuassign', element: <MenuAssign /> },
        { path: 'updatehrorganizationunits/:organization_id', element: <UpdateHrOrganizationUnits /> },
        { path: 'addhrorganization', element: <AddHrOrganizationUnits /> },
        { path: 'showlocationsall', element: <ShowLocationsAll /> },
        { path: 'updatehrlocations/:location_id', element: <UpdateHrLocations /> },
        { path: 'addhrlocations/:location_id', element: <AddHrLocations /> },
        { path: 'showfnduser', element: <ShowFndUser /> },
        { path: 'updatefnduser/:user_id', element: <UpdateFndUser /> },
        { path: 'addfnduser', element: <AddFndUser /> },
        { path: 'showmtltransactiontypes', element: <ShowMtlTransactionTypes /> },
        { path: 'addmtltransactiontypes', element: <AddMtlTransactionTypes /> },
        { path: 'updatemtltransactiontypes/:transaction_type_id', element: <UpdateMtlTransactionTypes /> },
        { path: 'showperallpeoples', element: <ShowPerAllPeoples /> },
        { path: 'addperallpeoples/:person_id', element: <AddPerAllPeoples /> },
        { path: 'menucreation', element: <MenuCreation /> },
        { path: 'menuassign', element: <MenuAssign /> },
        { path: 'showmainsystemmenu', element: <ShowMainSystemMenu /> },
        { path: 'showwfnotifications', element: <ShowWfNotifications /> },
        { path: 'updatemainsystemmenu/:system_menu_id', element: <UpdateMainSystemMenu /> },
        { path: 'salesOrderForm', element: <SalesOrderFormPage /> },
        { path: 'manageSalesOrderForm', element: <ManageSoPage /> },
        { path: 'wfNotificationView/:notification_id', element: <WfNotificationView /> },
        { path: 'updateSalesOrderForm/:header_id', element: <UpdateSalesOrderForm /> },
        { path: 'showapprovedsalesorders', element: <ShowApprovedSalesOrders /> },
        { path: 'showhzcustaccounts', element: <ShowHzCustAccounts /> },
        { path: 'addhzcustaccounts/:cust_account_id', element: <AddHzCustAccounts /> },
        { path: 'showexcelfile', element: <ShowExcelFile /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
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
