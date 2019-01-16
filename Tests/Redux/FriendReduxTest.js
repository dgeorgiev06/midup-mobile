import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/FriendRedux'

test('attempt retrieving a single friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.friend).toBe(null)
})

test('attempt retrieving a list of friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.friends).toBe(null)
})

test('attempt updating a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.friend).toEqual({id: 1})
})

test('success retrieving a list of friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.friends).toEqual([{id: 1}, {id: 2}])
})

test('success updating a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.friend).toEqual({id: 1})
})
test('success searching a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.friends).toEqual({id: 1})
})
test('success deleting a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.friend).toEqual(null)
})

test('failure retrieving a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.friend).toEqual(null)
})

test('failure retrieving a list of friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.friends).toEqual(null)
})

test('failure updating a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.friend).toEqual(INITIAL_STATE.friend)
})
test('failure searching a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.friends).toEqual(null)
})
test('failure deleting a friend', () => {
  const state = reducer(INITIAL_STATE, Actions.friendDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.friend).toEqual(INITIAL_STATE.friend)
})
