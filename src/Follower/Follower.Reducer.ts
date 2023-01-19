import {
  GET_FOLLOWER_FAIL,
  GET_FOLLOWER_REQUEST,
  GET_FOLLOWER_SUCCESS,
} from './Follower.Action';
import {Action, State} from '../reducers';

const initialState: State = {fetching: false, data: null, err: null};

export const getFollower = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_FOLLOWER_REQUEST:
      return {
        fetching: true,
        data: null,
        err: null,
      };
    case GET_FOLLOWER_SUCCESS:
      return {
        fetching: false,
        data: action.payload.data,
        err: null,
      };
    case GET_FOLLOWER_FAIL:
      return {
        fetching: false,
        data: null,
        err: action.payload.err,
      };
    default:
      return state;
  }
};
