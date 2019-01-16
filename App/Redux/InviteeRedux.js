import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  inviteeRequest: ['inviteeId'],
  inviteeAllRequest: ['options'],
  inviteeUpdateRequest: ['invitee'],
  inviteeSearchRequest: ['query'],
  inviteeDeleteRequest: ['inviteeId'],

  inviteeSuccess: ['invitee'],
  inviteeAllSuccess: ['invitees'],
  inviteeUpdateSuccess: ['invitee'],
  inviteeSearchSuccess: ['invitees'],
  inviteeDeleteSuccess: [],

  inviteeFailure: ['error'],
  inviteeAllFailure: ['error'],
  inviteeUpdateFailure: ['error'],
  inviteeSearchFailure: ['error'],
  inviteeDeleteFailure: ['error']
})

export const InviteeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  invitee: null,
  invitees: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    invitee: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    invitees: null
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
  const { invitee } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    invitee
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { invitees } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    invitees
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { invitee } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    invitee
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { invitees } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    invitees
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    invitee: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    invitee: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    invitees: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    invitee: state.invitee
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    invitee: state.invitee
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    invitees: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INVITEE_REQUEST]: request,
  [Types.INVITEE_ALL_REQUEST]: allRequest,
  [Types.INVITEE_UPDATE_REQUEST]: updateRequest,
  [Types.INVITEE_SEARCH_REQUEST]: searchRequest,
  [Types.INVITEE_DELETE_REQUEST]: deleteRequest,

  [Types.INVITEE_SUCCESS]: success,
  [Types.INVITEE_ALL_SUCCESS]: allSuccess,
  [Types.INVITEE_UPDATE_SUCCESS]: updateSuccess,
  [Types.INVITEE_SEARCH_SUCCESS]: searchSuccess,
  [Types.INVITEE_DELETE_SUCCESS]: deleteSuccess,

  [Types.INVITEE_FAILURE]: failure,
  [Types.INVITEE_ALL_FAILURE]: allFailure,
  [Types.INVITEE_UPDATE_FAILURE]: updateFailure,
  [Types.INVITEE_SEARCH_FAILURE]: searchFailure,
  [Types.INVITEE_DELETE_FAILURE]: deleteFailure
})
