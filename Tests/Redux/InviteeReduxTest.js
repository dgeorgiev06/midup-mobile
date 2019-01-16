import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/InviteeRedux'

test('attempt retrieving a single invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.invitee).toBe(null)
})

test('attempt retrieving a list of invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.invitees).toBe(null)
})

test('attempt updating a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.invitee).toEqual({id: 1})
})

test('success retrieving a list of invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.invitees).toEqual([{id: 1}, {id: 2}])
})

test('success updating a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.invitee).toEqual({id: 1})
})
test('success searching a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.invitees).toEqual({id: 1})
})
test('success deleting a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.invitee).toEqual(null)
})

test('failure retrieving a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.invitee).toEqual(null)
})

test('failure retrieving a list of invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.invitees).toEqual(null)
})

test('failure updating a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.invitee).toEqual(INITIAL_STATE.invitee)
})
test('failure searching a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.invitees).toEqual(null)
})
test('failure deleting a invitee', () => {
  const state = reducer(INITIAL_STATE, Actions.inviteeDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.invitee).toEqual(INITIAL_STATE.invitee)
})
