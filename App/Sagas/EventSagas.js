import { call, put, select } from 'redux-saga/effects'
import EventActions from '../Redux/EventRedux'
import { callApi } from './CallApiSaga'
import { userProfile } from '../Redux/UserProfileRedux'
import Transform from '../Transforms/EventTransforms'

export function * getEvent (api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.getEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    const event = Transform.transform(response.data)
    yield put(EventActions.eventSuccess(event))
  } else {
    yield put(EventActions.eventFailure(response.error))
  }
}

export function * getEvents (api, action) {
  const { options } = action
  const profile = yield select(userProfile)
  // make the call to the api
  const apiCall = call(api.getEvents, profile, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventAllSuccess(response.data))
  } else {
    yield put(EventActions.eventAllFailure(response.problem))
  }
}

export function * updateEvent (api, action) {
  const { event } = action
  // make the call to the api
  const localImage = event.imageUrl && !event.imageUrl.includes('http')
  //The below check is necessary to make a multi part call if we are sending an image
  const apiCall = call(localImage ? api.updateEventWithLocalImage : api.updateEvent, event)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventUpdateSuccess(response.data))
  } else {
    yield put(EventActions.eventUpdateFailure(response.problem))
  }
}

export function * searchEvents (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchEvents, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventSearchSuccess(response.data))
  } else {
    yield put(EventActions.eventSearchFailure(response.problem))
  }
}
export function * deleteEvent (api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.deleteEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventDeleteSuccess())
  } else {
    yield put(EventActions.eventDeleteFailure(response.problem))
  }
}
