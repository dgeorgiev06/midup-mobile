import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getUserProfile, getUserProfiles, updateUserProfile, deleteUserProfile, searchUserProfiles } from '../../App/Sagas/UserProfileSagas'
import UserProfileActions from '../../App/Redux/UserProfileRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getUserProfile(1)
  const step = stepper(getUserProfile(FixtureAPI, { userProfileId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProfileActions.userProfileSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getUserProfile(FixtureAPI, { userProfileId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProfileActions.userProfileFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getUserProfiles()
  const step = stepper(getUserProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProfileActions.userProfileAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getUserProfiles(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProfileActions.userProfileAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateUserProfile({id: 1})
  const step = stepper(updateUserProfile(FixtureAPI, { userProfile: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProfileActions.userProfileUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateUserProfile(FixtureAPI, { userProfile: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProfileActions.userProfileUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchUserProfiles()
  const step = stepper(searchUserProfiles(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProfileActions.userProfileSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchUserProfiles(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProfileActions.userProfileSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteUserProfile({id: 1})
  const step = stepper(deleteUserProfile(FixtureAPI, { userProfileId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserProfileActions.userProfileDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteUserProfile(FixtureAPI, { userProfileId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserProfileActions.userProfileDeleteFailure()))
})
