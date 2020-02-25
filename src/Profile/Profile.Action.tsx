// Get profile github
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export const getProfileRequest = (username: any) => {
  return {type: GET_PROFILE_REQUEST, payload: {username}};
};
export const getProfileSuccess = (data: any) => {
  return {type: GET_PROFILE_SUCCESS, payload: {data}};
};
export const getProfileFail = (err: any) => {
  return {type: GET_PROFILE_FAIL, payload: {err}};
};
