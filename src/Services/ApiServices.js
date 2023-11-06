/* eslint-disable camelcase */
import axios from 'axios';
import getCookieService from './GetCookieService';

const usersUrl = 'http://localhost:5001/';

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
    return await axios.get(`${usersUrl}logged-user/`, {
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

export const getHrLocationsDetails = async () => {
  try {
    return await axios.get(`${usersUrl}get-hr-locations-all/`);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
export const getPerHrLocationsDetails = async ( { location_id } ) => {
  try {
    return await axios.get(`${usersUrl}get-per-hr-locations-all/${location_id}`);
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
// eslint-disable-next-line camelcase
export const updateHrLocationsDetails = async ( locationsDetails ) => {
  console.log('location for api ', locationsDetails.location_id );
  try {
    // eslint-disable-next-line camelcase
    return await axios.put(`${usersUrl}update-hr-locations-all/${locationsDetails.location_id}`,locationsDetails);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
