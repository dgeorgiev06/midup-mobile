import { call, put } from 'redux-saga/effects'
import UserProfileActions from '../Redux/UserProfileRedux'
import { callApi } from './CallApiSaga'

export function * getUserProfile (api, action) {
  const { userProfileId } = action
  // make the call to the api
  const apiCall = call(api.getUserProfile, userProfileId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProfileActions.userProfileSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileFailure(response.problem))
  }
}

export function * getCurrentUserProfile (api, action) {
  
  // make the call to the api
  const apiCall = call(api.getCurrentUserProfile)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProfileActions.userProfileCurrentSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileCurrentFailure(response.problem))
  }
}

export function * getUserProfiles (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserProfiles, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProfileActions.userProfileAllSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileAllFailure(response.problem))
  }
}

export function * getUserProfilesSansFriends (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserProfilesSansFriends, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProfileActions.userProfileSansFriendsSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileSansFriendsFailure(response.problem))
  }
}

export function * updateUserProfile (api, action) {
  const { userProfile } = action
  // make the call to the api
  
  // make the call to the api
  const localImage = userProfile.imageUrl && !userProfile.imageUrl.includes('http')
  //The below check is necessary to make a multi part call if we are sending an image
  const apiCall = call(localImage ? api.updateUserProfileWithLocalImage : api.updateUserProfile, userProfile)
  const response = yield call(callApi, apiCall)

  // success?
  if (response && response.ok) {
    yield put(UserProfileActions.userProfileUpdateSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileUpdateFailure({error : response ? response.problem : "Something went wrong with profile update"}))
  }
}

export function * searchUserProfiles (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchUserProfiles, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response && response.ok) {
    yield put(UserProfileActions.userProfileSearchSuccess(response.data))
  } else {
    yield put(UserProfileActions.userProfileSearchFailure(response ? response.problelm : null))
  }
}
export function * deleteUserProfile (api, action) {
  const { userProfileId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserProfile, userProfileId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProfileActions.userProfileDeleteSuccess())
  } else {
    yield put(UserProfileActions.userProfileDeleteFailure(response.problem))
  }
}
