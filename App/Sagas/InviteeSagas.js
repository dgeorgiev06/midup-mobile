import { call, put } from 'redux-saga/effects'
import InviteeActions from '../Redux/InviteeRedux'
import { callApi } from './CallApiSaga'

export function * getInvitee (api, action) {
  const { inviteeId } = action
  // make the call to the api
  const apiCall = call(api.getInvitee, inviteeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InviteeActions.inviteeSuccess(response.data))
  } else {
    yield put(InviteeActions.inviteeFailure(response.problem))
  }
}

export function * getInvitees (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getInvitees, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InviteeActions.inviteeAllSuccess(response.data))
  } else {
    yield put(InviteeActions.inviteeAllFailure(response.problem))
  }
}

export function * updateInvitee (api, action) {
  const { invitee } = action
  // make the call to the api
  const idIsNotNull = !!invitee.id
  const apiCall = call(idIsNotNull ? api.updateInvitee : api.createInvitee, invitee)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InviteeActions.inviteeUpdateSuccess(response.data))
  } else {
    yield put(InviteeActions.inviteeUpdateFailure(response.problem))
  }
}

export function * searchInvitees (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchInvitees, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InviteeActions.inviteeSearchSuccess(response.data))
  } else {
    yield put(InviteeActions.inviteeSearchFailure(response.problem))
  }
}
export function * deleteInvitee (api, action) {
  const { inviteeId } = action
  // make the call to the api
  const apiCall = call(api.deleteInvitee, inviteeId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(InviteeActions.inviteeDeleteSuccess())
  } else {
    yield put(InviteeActions.inviteeDeleteFailure(response.problem))
  }
}
