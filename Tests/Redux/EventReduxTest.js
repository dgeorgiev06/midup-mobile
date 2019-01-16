import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/EventRedux'

test('attempt retrieving a single event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.event).toBe(null)
})

test('attempt retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.events).toBe(null)
})

test('attempt updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.event).toEqual({id: 1})
})

test('success retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.events).toEqual([{id: 1}, {id: 2}])
})

test('success updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.event).toEqual({id: 1})
})
test('success searching a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.events).toEqual({id: 1})
})
test('success deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.event).toEqual(null)
})

test('failure retrieving a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.event).toEqual(null)
})

test('failure retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.events).toEqual(null)
})

test('failure updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.event).toEqual(INITIAL_STATE.event)
})
test('failure searching a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.events).toEqual(null)
})
test('failure deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.event).toEqual(INITIAL_STATE.event)
})
