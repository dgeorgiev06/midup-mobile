import { call, put } from 'redux-saga/effects'
import VenueActions from '../Redux/VenueRedux'
import { callApi } from './CallApiSaga'
import Transform from '../Transforms/GoogleLocationsTransforms'

export function * getVenues (api, action) {
  const { coordinates } = action
  // make the call to the api
  const apiCall = call(api.getVenues, [coordinates.lat, coordinates.lng], coordinates.radius * 1000)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    const transformedLocations = Transform.transform(response.data.results);
    yield put(VenueActions.venueSuccess(transformedLocations))
  } else {
    yield put(VenueActions.venueFailure(response.problem))
  }
}

export function * getVenueDetails (api, action) {
  const { id } = action
  // make the call to the api
  const apiCall = call(api.getVenue, id)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    const transformedLocation = Transform.transformDetails(response.data.result);
    yield put(VenueActions.venueDetailsSuccess(transformedLocation))
  } else {
    yield put(VenueActions.venueDetailsFailure(response.problem))
  }
}