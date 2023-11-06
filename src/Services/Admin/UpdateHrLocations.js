/* eslint-disable camelcase */


import { updateHrLocationsDetails } from '../ApiServices';

export const updateHrLocationsService = async (locationsDetails) => {
  console.log("location in ",locationsDetails.location_id);
  const response = await updateHrLocationsDetails( locationsDetails);

  if(!response) return null;

//   const updatedResponse = response.data.filter(data => data.status !== 'deleted').map(data => updateAccountInfo(data));

  return response;
};