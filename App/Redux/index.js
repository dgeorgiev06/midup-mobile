import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./AppStateRedux').reducer,
  users: require('./UserRedux').reducer,
  chat: require('./ChatRedux').reducer,
  userProfiles: require('./UserProfileRedux').reducer,
  events: require('./EventRedux').reducer,
  invitees: require('./InviteeRedux').reducer,
  friends: require('./FriendRedux').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./AccountRedux').reducer,
  login: require('./LoginRedux').reducer,
  register: require('./RegisterRedux').reducer,
  password: require('./PasswordRedux').reducer,
  search: require('./SearchRedux').reducer,
  venues: require('./VenueRedux').reducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'LOGOUT_REQUEST') {
    state = undefined
  }

  return  reducers(state, action)
}

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
