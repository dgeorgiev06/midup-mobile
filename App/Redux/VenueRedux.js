import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Venue from '../Services/dao/Venue'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  venueRequest: ['coordinates'],
  venueSuccess: ['venues'],
  venueFailure: ['error'],
  venueDetailsRequest: ['id'],
  venueDetailsSuccess: ['details'],
  venueDetailsFailure: ['error']
})

export const VenueTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  fetchingDetails: null,
  centerCoordinate: null,
  venues: null,
  venueDetails: null,
  error: null,
  errorDetails: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) => {
  const { coordinates } = action
  return state.merge({
    fetching: true,
    coordinates: coordinates,
    venues: null
  })
}

// request the data from an api
export const detailsRequest = (state) => {
  return state.merge({
    fetchingDetails: true,
    venueDetails: null
  })
}

export const success = (state, action) => {
  let { venues } = action

  if(venues && venues.length) {
    const options = {'prototype': Venue.prototype}
    venues = venues.map((venue) => Immutable(venue, options))
  }

  return state.merge({
    fetching: false,
    error: null,
    venues
  })
}

export const detailsSuccess = (state, action) => {
  let { details } = action
  if(details) {
    details = Immutable(details, {'prototype': Venue.prototype})
  }

  const venues = state.venues
  const updatedVenues = venues.map((venue) => {
    if(details.id == venue.id) {
      return details
    }
    else {
      return venue
    }
  })

  return state.merge({
    fetchingDetails: false,
    error: null,
    details,
    venues: updatedVenues
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetching: false,
    error: error,
    venues: null,
    coordinates: null
  })
}

// Something went wrong fetching a single entity.
export const detailsFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingDetails: false,
    error: error,
    venueDetails: null,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENUE_REQUEST]: request,
  [Types.VENUE_SUCCESS]: success,
  [Types.VENUE_FAILURE]: failure,
  [Types.VENUE_DETAILS_REQUEST]: detailsRequest,
  [Types.VENUE_DETAILS_SUCCESS]: detailsSuccess,
  [Types.VENUE_DETAILS_FAILURE]: detailsFailure
})
