import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  friendRequest: ['friendId'],
  friendNewRequest: ['requestedFriends'],
  friendAllRequest: ['options'],
  friendUpdateRequest: ['friend'],
  friendSearchRequest: ['query'],
  friendDeleteRequest: ['friendId'],

  friendSuccess: ['friend'],
  friendNewSuccess: ['requestedFriends'],
  friendAllSuccess: ['friends'],
  friendUpdateSuccess: ['friend'],
  friendSearchSuccess: ['friends'],
  friendDeleteSuccess: [],

  friendFailure: ['error'],
  friendNewFailure: ['error'],
  friendAllFailure: ['error'],
  friendUpdateFailure: ['error'],
  friendSearchFailure: ['error'],
  friendDeleteFailure: ['error']
})

export const FriendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  fetchingNew: null,
  updating: null,
  searching: null,
  deleting: null,
  friend: null,
  friends: null,
  requestedFriends: null,
  errorOne: null,
  errorAll: null,
  errorNew: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    friend: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    friends: null
  })

// request the data from an api
export const newRequest = (state) =>
  state.merge({
    fetchingNew: true,
    requestedFriends: null
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
  const { friend } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    friend
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { friends } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    friends
  })
}
// successful api lookup for all entities
export const newSuccess = (state, action) => {
  const { requestedFriends } = action
  return state.merge({
    fetchingNew: false,
    errorNew: null,
    requestedFriends
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { friend } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    friend
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { friends } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    friends
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    friend: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    friend: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    friends: null
  })
}

// Something went wrong fetching all entities.
export const newFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingNew: false,
    errorNew: error,
    requestedFriends: null
  })
}

// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    friend: state.friend
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    friend: state.friend
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    friends: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FRIEND_REQUEST]: request,
  [Types.FRIEND_ALL_REQUEST]: allRequest,
  [Types.FRIEND_NEW_REQUEST]: newRequest,
  [Types.FRIEND_UPDATE_REQUEST]: updateRequest,
  [Types.FRIEND_SEARCH_REQUEST]: searchRequest,
  [Types.FRIEND_DELETE_REQUEST]: deleteRequest,

  [Types.FRIEND_SUCCESS]: success,
  [Types.FRIEND_ALL_SUCCESS]: allSuccess,
  [Types.FRIEND_NEW_SUCCESS]: newSuccess,
  [Types.FRIEND_UPDATE_SUCCESS]: updateSuccess,
  [Types.FRIEND_SEARCH_SUCCESS]: searchSuccess,
  [Types.FRIEND_DELETE_SUCCESS]: deleteSuccess,

  [Types.FRIEND_FAILURE]: failure,
  [Types.FRIEND_ALL_FAILURE]: allFailure,
  [Types.FRIEND_NEW_FAILURE]: newFailure,
  [Types.FRIEND_UPDATE_FAILURE]: updateFailure,
  [Types.FRIEND_SEARCH_FAILURE]: searchFailure,
  [Types.FRIEND_DELETE_FAILURE]: deleteFailure
})
