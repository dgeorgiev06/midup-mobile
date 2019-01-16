import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userProfileRequest: ['userProfileId'],
  userProfileCurrentRequest: [],
  userProfileAllRequest: ['options'],
  userProfileSansFriendsRequest: [],
  userProfileUpdateRequest: ['userProfile'],
  userProfileSearchRequest: ['query'],
  userProfileDeleteRequest: ['userProfileId'],

  userProfileSuccess: ['userProfile'],
  userProfileCurrentSuccess: ['currentUserProfile'],
  userProfileAllSuccess: ['userProfiles'],
  userProfileSansFriendsSuccess: ['userProfilesSansFriends'],
  userProfileUpdateSuccess: ['userProfile'],
  userProfileSearchSuccess: ['userProfiles'],
  userProfileDeleteSuccess: [],

  userProfileFailure: ['error'],
  userProfileCurrentFailure: ['error'],
  userProfileAllFailure: ['error'],
  userProfileSansFriendsFailure: ['error'],
  userProfileUpdateFailure: ['error'],
  userProfileSearchFailure: ['error'],
  userProfileDeleteFailure: ['error']
})

export const UserProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingCurrent: null,
  fetchingAll: null,
  fetchingSansFriends: null,
  updating: null,
  searching: null,
  deleting: null,
  userProfile: null,
  currentUserProfile: null,
  userProfiles: null,
  userProfilesSansFriends: null,
  errorOne: null,
  errorCurrent: null,
  errorAll: null,
  errorSansFriends: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  profileImage: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    userProfile: null
  })

// request the data from an api
export const currentRequest = (state) =>
  state.merge({
    fetchingCurrent: true,
    currentUserProfile: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    userProfiles: null
  })

// request the data from an api
export const sansFriendsRequest = (state) =>
  state.merge({
    fetchingSansFriends: true,
    userProfilesSansFriends: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { userProfile } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userProfile
  })
}
// successful api lookup for single entity
export const currentSuccess = (state, action) => {
  const { currentUserProfile } = action
  return state.merge({
    fetchingCurrent: false,
    errorCurrent: null,
    currentUserProfile
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userProfiles } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userProfiles
  })
}
// successful api lookup for all entities
export const sansFriendsSuccess = (state, action) => {
  const { userProfilesSansFriends } = action
  return state.merge({
    fetchingSansFriends: false,
    errorSansFriends: null,
    userProfilesSansFriends
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { userProfile } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    currentUserProfile: userProfile
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { userProfiles } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    userProfiles
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userProfile: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userProfile: null
  })
}
// Something went wrong fetching a single entity.
export const currentFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingCurrent: false,
    errorCurrent: error,
    currentUserProfile: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userProfiles: null
  })
}
// Something went wrong fetching all entities.
export const sansFriendsFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingSansFriends: false,
    errorSansFriends: error,
    userProfilesSansFriends: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    userProfile: state.userProfile
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userProfile: state.userProfile
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    userProfiles: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_PROFILE_REQUEST]: request,
  [Types.USER_PROFILE_CURRENT_REQUEST]: currentRequest,
  [Types.USER_PROFILE_ALL_REQUEST]: allRequest,
  [Types.USER_PROFILE_SANS_FRIENDS_REQUEST]: sansFriendsRequest,
  [Types.USER_PROFILE_UPDATE_REQUEST]: updateRequest,
  [Types.USER_PROFILE_SEARCH_REQUEST]: searchRequest,
  [Types.USER_PROFILE_DELETE_REQUEST]: deleteRequest,

  [Types.USER_PROFILE_SUCCESS]: success,
  [Types.USER_PROFILE_CURRENT_SUCCESS]: currentSuccess,
  [Types.USER_PROFILE_ALL_SUCCESS]: allSuccess,
  [Types.USER_PROFILE_SANS_FRIENDS_SUCCESS]: sansFriendsSuccess,
  [Types.USER_PROFILE_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_PROFILE_SEARCH_SUCCESS]: searchSuccess,
  [Types.USER_PROFILE_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_PROFILE_FAILURE]: failure,
  [Types.USER_PROFILE_CURRENT_FAILURE]: currentFailure,
  [Types.USER_PROFILE_ALL_FAILURE]: allFailure,
  [Types.USER_PROFILE_SANS_FRIENDS_FAILURE]: sansFriendsFailure,
  [Types.USER_PROFILE_UPDATE_FAILURE]: updateFailure,
  [Types.USER_PROFILE_SEARCH_FAILURE]: searchFailure,
  [Types.USER_PROFILE_DELETE_FAILURE]: deleteFailure
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const userProfile = (state) => {
  return state.userProfiles.currentUserProfile
}
