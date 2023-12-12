/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import axios from 'axios';
import getCookieService from './GetCookieService';

const usersUrl = 'http://182.160.114.100:5001/';

export const signup = async (user) => {
  try {
    return await axios.post(`${usersUrl}signup/`, user);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const compareOtp = async (verifyUser) => {
  try {
    return await axios.post(`${usersUrl}compare-otp/`, verifyUser);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const sendOtp = async (body) => {
  try {
    return await axios.post(`${usersUrl}send-otp/`, body);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const login = async (user) => {
  try {
    return await axios.post(`${usersUrl}login/`, user);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getLoggedInUserDetails = async () => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}loggedin-user/`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getAccountDetails = async (emailAddress) => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}account-info/${emailAddress}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getUserProfileDetails = async () => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}profile/`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateProfileDetails = async (emailAddress, profileDetails) => {
  try {
    console.log(emailAddress);
    return await axios.put(`${usersUrl}update/profile/${emailAddress}`, profileDetails);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const comparePassword = async (passwordInfo) => {
  try {
    return await axios.post(`${usersUrl}compare-password/`, passwordInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updatePassword = async (passwordInfo) => {
  try {
    return await axios.put(`${usersUrl}update-password/`, passwordInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateUsername = async (usernameInfo) => {
  try {
    return await axios.put(`${usersUrl}update-username/`, usernameInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getUsersDetails = async () => {
  try {
    return await axios.get(`${usersUrl}users/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateUserStatus = async (bodyInfo) => {
  try {
    return await axios.put(`${usersUrl}update-status/`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const uploadProfilePhoto = async (emailAddress, bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}upload/profile-photo/${emailAddress}`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const deleteUser = async (emailAddress) => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.delete(`${usersUrl}remove-user/${emailAddress}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const sendEmailService = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}send-email/`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getBlogsDetails = async () => {
  try {
    return await axios.get(`${usersUrl}blogs/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getReadCount = async (blogId) => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}read-count/${blogId}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addBlogReadService = async (blogId) => {
  const cookie = getCookieService('jwt-token-cookie');
  console.log(cookie);

  try {
    return await axios.post(
      `${usersUrl}read-blog/${blogId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const likeBlogService = async (blogId) => {
  const cookie = getCookieService('jwt-token-cookie');
  console.log(cookie);

  try {
    return await axios.post(
      `${usersUrl}like-blog/${blogId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getLikedBlogDetails = async (blogId) => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}like-stat/${blogId}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getLikeCount = async (blogId) => {
  const cookie = getCookieService('jwt-token-cookie');

  try {
    return await axios.get(`${usersUrl}like-count/${blogId}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const logoutService = async () => {
  try {
    return await axios.get(`${usersUrl}logout/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// admin panel
// UOM
export const getUomDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-unit-measure/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addUomDetails = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}add-unit-measure`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateUomDetails = async (bodyInfo) => {
  try {
    return await axios.put(`${usersUrl}update-unit-measure`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const disableUomDetails = async (bodyInfo) => {
  try {
    return await axios.put(`${usersUrl}disable-unit-measure`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getHrLocationsDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-hr-locations-all/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getHrLocationsIdDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-hr-locations-id/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getPerAllPeoplesDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-per-all-peoples/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getfnduserDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-fnd-user/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getMainSystemMenuDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-main-system-menu/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getAllMtlTransactionTypes = async () => {
  try {
    return await axios.get(`${usersUrl}get-mtl-transaction-types/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getAllMtlTransactions = async () => {
  try {
    return await axios.get(`${usersUrl}get-mtl-material-transactions/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getFndUserIds = async () => {
  try {
    return await axios.get(`${usersUrl}get-fnd-user/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getMenuIds = async () => {
  try {
    return await axios.get(`${usersUrl}get-menu-ids/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getMenusDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-menus/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getperPerAllPeoplesDetails = async (person_id) => {
  try {
    return await axios.get(`${usersUrl}getper-per-all-peoples/${person_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getPerFndUserDetails = async (user_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-fnd-user/${user_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getperMainSystemMenuDetails = async (system_menu_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-main-system-menu/${system_menu_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getperMenuDetails = async (menu_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-menus/${menu_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getHrAllOrganizationUnits = async () => {
  try {
    return await axios.get(`${usersUrl}get-hr-organization-units/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getPerHrLocationsDetails = async (location_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-hr-locations-all/${location_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getPerHrOrganizationUnits = async (organization_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-hr-organization-units/${organization_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getPerAllMtlTransactionTypes = async (transaction_type_id) => {
  try {
    return await axios.get(`${usersUrl}get-per-mtl-transaction-types/${transaction_type_id}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addHrLocationsDetails = async (location) => {
  console.log('location for api ', location);
  try {
    return await axios.post(`${usersUrl}add-hr-locations-all/`, location);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addPerAllPeopleDetails = async (people) => {
  console.log('people for api ', people);
  try {
    return await axios.post(`${usersUrl}add-per-all-peoples/`, people);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addFndUserDetails = async (fnduser) => {
  console.log('people for api ', fnduser);
  try {
    return await axios.post(`${usersUrl}add-fnd-user/`, fnduser);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addMainSystemMenuDetails = async (mainsystemmenu) => {
  console.log('people for api ', mainsystemmenu);
  try {
    return await axios.post(`${usersUrl}add-main-system-menu/`, mainsystemmenu);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addMenusDetails = async (menus) => {
  console.log('people for api ', menus);
  try {
    return await axios.post(`${usersUrl}add-menus/`, menus);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addSubMenusDetails = async (submenus) => {
  console.log('people for api ', submenus);
  try {
    return await axios.post(`${usersUrl}add-sub-menu/`, submenus);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const addUserAssign = async (assign) => {
  console.log('people for api ', assign);
  try {
    return await axios.post(`${usersUrl}add-user-assign/`, assign);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addHrOrganizationUnitsDetails = async (organization) => {
  console.log('organization for api ', organization);
  try {
    console.log('Inside it ', organization);
    return await axios.post(`${usersUrl}add-hr-organization-units/`, organization);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addMtlTransactionTypesDetails = async (transaction) => {
  console.log('Transaction for api ', transaction);
  try {
    console.log('Inside it ', transaction);
    return await axios.post(`${usersUrl}add-mtl-transaction-types/`, transaction);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// eslint-disable-next-line camelcase
export const updateHrLocationsDetails = async (locationsDetails) => {
  console.log('location for api ', locationsDetails.location_id);
  try {
    // eslint-disable-next-line camelcase
    return await axios.put(`${usersUrl}update-hr-locations-all/${locationsDetails.location_id}`, locationsDetails);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// item master
export const getSytemItems = async () => {
  try {
    return await axios.get(`${usersUrl}get-item-master/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addSystemItemsDetails = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}add-item-master`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateSystemItems = async (bodyInfo) => {
  try {
    return await axios.put(`${usersUrl}update-item-master`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const disableSystemItems = async (bodyInfo) => {
  try {
    return await axios.put(`${usersUrl}delete-item-master`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// txn request headers and lines
export const getTransactionTypeList = async () => {
  try {
    return await axios.get(`${usersUrl}get-mtl-transaction-types/list`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getOrganizationIdList = async () => {
  try {
    return await axios.get(`${usersUrl}get-hr-organization-units/list`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addTxnRequestHeader = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}add-txn-header`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getUserwiseTxnRequestHeader = async (bodyInfo) => {
  try {
    console.log(bodyInfo);
    return await axios.get(`${usersUrl}get-txn-header/${bodyInfo}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const addTxnRequestLines = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}add-txn-line`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getInventoryItemIdList = async () => {
  try {
    return await axios.get(`${usersUrl}get-item-master/inventory_item_id`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getUomCodeList = async () => {
  try {
    return await axios.get(`${usersUrl}get-unit-measure/uom_code`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const deleteTxnRequestLines = async (lineId) => {
  console.log(lineId);
  try {
    return await axios.delete(`${usersUrl}delete-txn-lines/${lineId}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const deleteTxnRequestHeader = async (headerId) => {
  try {
    return await axios.delete(`${usersUrl}delete-txn-header/${headerId}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// user menu services
export const getUserMenuList = async (userInfo) => {
  try {
    return await axios.get(`${usersUrl}get-menus/${userInfo}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// sales order module services
// sales order headers
export const addSalesOrderHeaderService = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}add-sales-order-header`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const deleteSalesOrderHeaderService = async (headerId) => {
  try {
    return await axios.delete(`${usersUrl}delete-sales-order-header/${headerId}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const updateSalesOrderHeaderService = async (headerId, headerInfo) => {
  try {
    return await axios.put(`${usersUrl}/update/${headerId}`, headerInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getSalesOrderHeaderService = async (requestInfo) => {
  try {
    return await axios.get(`${usersUrl}get-sales-order-header/${requestInfo}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

// sales order lines
export const addSalesOrderLinesService = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}sales-order-line/add`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const deleteSalesOrderLinesService = async (lineId) => {
  try {
    return await axios.delete(`${usersUrl}sales-order-line/delete/${lineId}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};

export const getSalesOrderLinesService = async (requestInfo) => {
  try {
    return await axios.get(`${usersUrl}sales-order-line/get/${requestInfo}`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
// procedure calls
export const callSoApprovalService = async (bodyInfo) => {
  try {
    return await axios.post(`${usersUrl}so-approval/call`, bodyInfo);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};