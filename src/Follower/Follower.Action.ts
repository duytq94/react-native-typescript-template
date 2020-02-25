// Get list follower
export const GET_FOLLOWER_REQUEST = 'GET_FOLLOWER_REQUEST';
export const GET_FOLLOWER_SUCCESS = 'GET_FOLLOWER_SUCCESS';
export const GET_FOLLOWER_FAIL = 'GET_FOLLOWER_FAIL';

export const getFollowerRequest = (username: string) => {
  return {type: GET_FOLLOWER_REQUEST, payload: {username}};
};
export const getFollowerSuccess = (data: any) => {
  return {type: GET_FOLLOWER_SUCCESS, payload: {data}};
};
export const getFollowerFail = (err: any) => {
  return {type: GET_FOLLOWER_FAIL, payload: {err}};
};
