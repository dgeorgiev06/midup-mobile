import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getEvent, getEvents, updateEvent, deleteEvent, searchEvents } from '../../App/Sagas/EventSagas'
import EventActions from '../../App/Redux/EventRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getEvent(1)
  const step = stepper(getEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getEvents()
  const step = stepper(getEvents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getEvents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateEvent({id: 1})
  const step = stepper(updateEvent(FixtureAPI, { event: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateEvent(FixtureAPI, { event: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchEvents()
  const step = stepper(searchEvents(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchEvents(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteEvent({id: 1})
  const step = stepper(deleteEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventDeleteFailure()))
})
