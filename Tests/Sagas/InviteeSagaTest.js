import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getInvitee, getInvitees, updateInvitee, deleteInvitee, searchInvitees } from '../../App/Sagas/InviteeSagas'
import InviteeActions from '../../App/Redux/InviteeRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getInvitee(1)
  const step = stepper(getInvitee(FixtureAPI, { inviteeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InviteeActions.inviteeSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getInvitee(FixtureAPI, { inviteeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InviteeActions.inviteeFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getInvitees()
  const step = stepper(getInvitees(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InviteeActions.inviteeAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getInvitees(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InviteeActions.inviteeAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateInvitee({id: 1})
  const step = stepper(updateInvitee(FixtureAPI, { invitee: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InviteeActions.inviteeUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateInvitee(FixtureAPI, { invitee: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InviteeActions.inviteeUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchInvitees()
  const step = stepper(searchInvitees(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InviteeActions.inviteeSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchInvitees(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InviteeActions.inviteeSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteInvitee({id: 1})
  const step = stepper(deleteInvitee(FixtureAPI, { inviteeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(InviteeActions.inviteeDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteInvitee(FixtureAPI, { inviteeId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(InviteeActions.inviteeDeleteFailure()))
})
