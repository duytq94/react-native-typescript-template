// Get profile github

import {GithubProfileResponse} from './Profile.Model';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export const getProfileRequest = (username: string) => {
  return {type: GET_PROFILE_REQUEST, payload: {username}};
};
export const getProfileSuccess = (response: GithubProfileResponse) => {
  return {type: GET_PROFILE_SUCCESS, payload: {data: response}};
};
export const getProfileFail = (err: object) => {
  return {type: GET_PROFILE_FAIL, payload: {err}};
};
