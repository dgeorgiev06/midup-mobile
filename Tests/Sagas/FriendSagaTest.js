import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getFriend, getFriends, updateFriend, deleteFriend, searchFriends } from '../../App/Sagas/FriendSagas'
import FriendActions from '../../App/Redux/FriendRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFriend(1)
  const step = stepper(getFriend(FixtureAPI, { friendId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FriendActions.friendSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getFriend(FixtureAPI, { friendId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FriendActions.friendFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFriends()
  const step = stepper(getFriends(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FriendActions.friendAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getFriends(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FriendActions.friendAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFriend({id: 1})
  const step = stepper(updateFriend(FixtureAPI, { friend: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FriendActions.friendUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateFriend(FixtureAPI, { friend: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FriendActions.friendUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchFriends()
  const step = stepper(searchFriends(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FriendActions.friendSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchFriends(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FriendActions.friendSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteFriend({id: 1})
  const step = stepper(deleteFriend(FixtureAPI, { friendId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FriendActions.friendDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteFriend(FixtureAPI, { friendId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FriendActions.friendDeleteFailure()))
})
