import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { callApi } from './CallApiSaga'

export function * getUser (api, action) {
  const { userId } = action
  // make the call to the api
  const apiCall = call(api.getUser, userId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userSuccess(response.data))
  } else {
    yield put(UserActions.userFailure(response.problem))
  }
}

export function * getUsers (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUsers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userAllSuccess(response.data))
  } else {
    yield put(UserActions.userAllFailure(response.problem))
  }
}

export function * updateUser (api, action) {
  const { user } = action
  // make the call to the api
  const idIsNotNull = !!user.id
  const apiCall = call(idIsNotNull ? api.updateUser : api.createUser, user)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userUpdateSuccess(response.data))
  } else {
    yield put(UserActions.userUpdateFailure(response.problem))
  }
}

export function * deleteUser (api, action) {
  const { userId } = action
  // make the call to the api
  const apiCall = call(api.deleteUser, userId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userDeleteSuccess())
  } else {
    yield put(UserActions.userDeleteFailure(response.problem))
  }
}
