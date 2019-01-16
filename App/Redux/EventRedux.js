import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Invitee from '../Services/dao/Invitee'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventRequest: ['eventId'],
  eventAllRequest: ['options'],
  eventUpdateRequest: ['event'],
  eventSearchRequest: ['query'],
  eventDeleteRequest: ['eventId'],

  eventSuccess: ['event'],
  eventAllSuccess: ['events'],
  eventUpdateSuccess: ['event'],
  eventSearchSuccess: ['events'],
  eventDeleteSuccess: [],

  eventFailure: ['error'],
  eventAllFailure: ['error'],
  eventUpdateFailure: ['error'],
  eventSearchFailure: ['error'],
  eventDeleteFailure: ['error']
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  event: null,
  events: null,
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
    event: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    events: null
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
  const { event } = action
  
  const options = {'prototype': Invitee.prototype}
  const invitees = event.invitees.map((invitee) => Immutable(invitee, options))
  event.invitees = invitees

  return state.merge({
    fetchingOne: false,
    errorOne: null,
    event
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { events } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    events
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { event } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    event
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { events } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    events
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    event: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    event: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    events: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    event: state.event
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    event: state.event
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    events: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  
  [Types.EVENT_REQUEST]: request,
  [Types.EVENT_ALL_REQUEST]: allRequest,
  [Types.EVENT_UPDATE_REQUEST]: updateRequest,
  [Types.EVENT_SEARCH_REQUEST]: searchRequest,
  [Types.EVENT_DELETE_REQUEST]: deleteRequest,

  [Types.EVENT_SUCCESS]: success,
  [Types.EVENT_ALL_SUCCESS]: allSuccess,
  [Types.EVENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.EVENT_SEARCH_SUCCESS]: searchSuccess,
  [Types.EVENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.EVENT_FAILURE]: failure,
  [Types.EVENT_ALL_FAILURE]: allFailure,
  [Types.EVENT_UPDATE_FAILURE]: updateFailure,
  [Types.EVENT_SEARCH_FAILURE]: searchFailure,
  [Types.EVENT_DELETE_FAILURE]: deleteFailure
})
