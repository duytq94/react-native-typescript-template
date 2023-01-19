import {call, put, takeLatest} from 'redux-saga/effects';
import {getFollower} from '../api';
import {
  GET_FOLLOWER_REQUEST,
  getFollowerFail,
  getFollowerSuccess,
} from './Follower.Action';
import {sendNetworkFail} from '../actions';
import {Action} from '../reducers';
import {GithubFollowerResponse} from './Follower.Model';

export function* watchGetFollower() {
  yield takeLatest(GET_FOLLOWER_REQUEST, handleGetFollower);
}

function* handleGetFollower(action: Action) {
  const response = yield call(getFollower, action.payload);
  if (response.ok) {
    const arrFollower: Array<GithubFollowerResponse> = [];
    for (let item in response.data) {
      arrFollower.push(GithubFollowerResponse.fromJSON(response.data[item]));
    }
    yield put(getFollowerSuccess(arrFollower));
  } else {
    if (
      response.problem !== 'NETWORK_ERROR' &&
      response.problem !== 'TIMEOUT_ERROR' &&
      response.problem !== 'CONNECTION_ERROR'
    ) {
      yield put(getFollowerFail(response.problem));
    } else {
      yield put(sendNetworkFail(response.problem));
      yield put(getFollowerFail(response.problem));
    }
  }
}
