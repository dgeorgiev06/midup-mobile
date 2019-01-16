import { call, put } from 'redux-saga/effects'
import FriendActions from '../Redux/FriendRedux'
import { callApi } from './CallApiSaga'

export function * getFriend (api, action) {
  const { friendId } = action
  // make the call to the api
  const apiCall = call(api.getFriend, friendId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendSuccess(response.data))
  } else {
    yield put(FriendActions.friendFailure(response.problem))
  }
}

export function * getFriends (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFriends, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendAllSuccess(response.data))
  } else {
    yield put(FriendActions.friendAllFailure(response.problem))
  }
}

export function * createFriends (api, action) {
  const { requestedFriends } = action
  // make the call to the api
  const apiCall = call(api.createFriends, requestedFriends)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendNewSuccess(response.data))
  } else {
    yield put(FriendActions.friendNewFailure(response.problem))
  }
}

export function * updateFriend (api, action) {
  const { friend } = action
  // make the call to the api
  const idIsNotNull = !!friend.id
  const apiCall = call(idIsNotNull ? api.updateFriend : api.createFriend, friend)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendUpdateSuccess(response.data))
  } else {
    yield put(FriendActions.friendUpdateFailure(response.problem))
  }
}

export function * searchFriends (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchFriends, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendSearchSuccess(response.data))
  } else {
    yield put(FriendActions.friendSearchFailure(response.problem))
  }
}
export function * deleteFriend (api, action) {
  const { friendId } = action
  // make the call to the api
  const apiCall = call(api.deleteFriend, friendId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FriendActions.friendDeleteSuccess())
  } else {
    yield put(FriendActions.friendDeleteFailure(response.problem))
  }
}
