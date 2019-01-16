import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/UserProfileRedux'

test('attempt retrieving a single userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.userProfile).toBe(null)
})

test('attempt retrieving a list of userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.userProfiles).toBe(null)
})

test('attempt updating a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.userProfile).toEqual({id: 1})
})

test('success retrieving a list of userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.userProfiles).toEqual([{id: 1}, {id: 2}])
})

test('success updating a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.userProfile).toEqual({id: 1})
})
test('success searching a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.userProfiles).toEqual({id: 1})
})
test('success deleting a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.userProfile).toEqual(null)
})

test('failure retrieving a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.userProfile).toEqual(null)
})

test('failure retrieving a list of userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.userProfiles).toEqual(null)
})

test('failure updating a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.userProfile).toEqual(INITIAL_STATE.userProfile)
})
test('failure searching a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.userProfiles).toEqual(null)
})
test('failure deleting a userProfile', () => {
  const state = reducer(INITIAL_STATE, Actions.userProfileDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.userProfile).toEqual(INITIAL_STATE.userProfile)
})
