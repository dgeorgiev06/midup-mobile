import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import GOOGAPI from '../Services/GoogApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { UserTypes } from '../Redux/UserRedux'
import { UserProfileTypes } from '../Redux/UserProfileRedux'
import { EventTypes } from '../Redux/EventRedux'
import { InviteeTypes } from '../Redux/InviteeRedux'
import { FriendTypes } from '../Redux/FriendRedux'
import { VenueTypes } from '../Redux/VenueRedux' 
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loginLoad } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPassword, changePassword } from './PasswordSagas'
import { getAccount, updateAccount } from './AccountSagas'
import { getUser, getUsers, updateUser, deleteUser } from './UserSagas'
import { getUserProfile, getCurrentUserProfile, getUserProfiles, updateUserProfile, deleteUserProfile, searchUserProfiles, getUserProfilesSansFriends } from './UserProfileSagas'
import { getEvent, getEvents, updateEvent, deleteEvent, searchEvents } from './EventSagas'
import { getInvitee, getInvitees, updateInvitee, deleteInvitee, searchInvitees } from './InviteeSagas'
import { getFriend, getFriends, updateFriend, deleteFriend, searchFriends, createFriends } from './FriendSagas'
import { getVenues, getVenueDetails } from './VenueSagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const googApi = DebugConfig.useFixtures ? FixtureAPI : GOOGAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(UserProfileTypes.USER_PROFILE_REQUEST, getUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_CURRENT_REQUEST, getCurrentUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_ALL_REQUEST, getUserProfiles, api),
    takeLatest(UserProfileTypes.USER_PROFILE_UPDATE_REQUEST, updateUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_DELETE_REQUEST, deleteUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_SEARCH_REQUEST, searchUserProfiles, api),
    takeLatest(UserProfileTypes.USER_PROFILE_SANS_FRIENDS_REQUEST, getUserProfilesSansFriends, api),

    takeLatest(EventTypes.EVENT_REQUEST, getEvent, api),
    takeLatest(EventTypes.EVENT_ALL_REQUEST, getEvents, api),
    takeLatest(EventTypes.EVENT_UPDATE_REQUEST, updateEvent, api),
    takeLatest(EventTypes.EVENT_DELETE_REQUEST, deleteEvent, api),
    takeLatest(EventTypes.EVENT_SEARCH_REQUEST, searchEvents, api),

    takeLatest(InviteeTypes.INVITEE_REQUEST, getInvitee, api),
    takeLatest(InviteeTypes.INVITEE_ALL_REQUEST, getInvitees, api),
    takeLatest(InviteeTypes.INVITEE_UPDATE_REQUEST, updateInvitee, api),
    takeLatest(InviteeTypes.INVITEE_DELETE_REQUEST, deleteInvitee, api),
    takeLatest(InviteeTypes.INVITEE_SEARCH_REQUEST, searchInvitees, api),

    takeLatest(FriendTypes.FRIEND_REQUEST, getFriend, api),
    takeLatest(FriendTypes.FRIEND_ALL_REQUEST, getFriends, api),
    takeLatest(FriendTypes.FRIEND_NEW_REQUEST, createFriends, api),
    takeLatest(FriendTypes.FRIEND_UPDATE_REQUEST, updateFriend, api),
    takeLatest(FriendTypes.FRIEND_DELETE_REQUEST, deleteFriend, api),
    takeLatest(FriendTypes.FRIEND_SEARCH_REQUEST, searchFriends, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),

    takeLatest(VenueTypes.VENUE_REQUEST, getVenues, googApi),
    takeLatest(VenueTypes.VENUE_DETAILS_REQUEST, getVenueDetails, googApi)
  ])
}