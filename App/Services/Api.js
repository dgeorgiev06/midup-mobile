// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 30000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const headers = {headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}}

  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth, headers)
  const register = (user) => api.post('api/register', user, headers)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, headers)

  const getAccount = () => api.get('api/account', headers)
  const updateAccount = (account) => api.post('api/account', account, headers)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', {currentPassword, newPassword}, headers)

  const getUser = (userId) => api.get('api/users/' + userId, headers)
  const getUsers = (options) => api.get('api/users', options, headers)
  const createUser = (user) => api.post('api/users', user, headers)
  const updateUser = (user) => api.put('api/users', user, headers)
  const deleteUser = (userId) => api.delete('api/users/' + userId, headers)

  const getUserProfile = (userProfileId) => api.get('api/user-profiles/' + userProfileId, headers)
  const getCurrentUserProfile = () => api.get('api/user-profiles/current-user', headers)
  const getUserProfiles = (options) => api.get('api/user-profiles', options, headers)
  const getUserProfilesSansFriends = (options) => api.get('api/user-profiles/sans-friends', options, headers)
  const createUserProfile = (userProfile) => api.post('api/user-profiles', userProfile, headers)
  const updateUserProfile = (userProfile) => api.put('api/user-profiles', userProfile, headers)
  const updateUserProfileWithLocalImage = (userProfile) => {
    let formData = new FormData()
    
    if(userProfile.imageUrl) {
      formData.append('image', {  
        uri: userProfile.imageUrl, //file path string
        name: 'profileImage.jpg',
      })
    }

    const userProfileDTO = {
      id: userProfile.id,
      userId: userProfile.userId,
      address: userProfile.address,
      addressLatitude: userProfile.addressLatitude,
      addressLongitude: userProfile.addressLongitude
    }

    formData.append('profile', JSON.stringify(userProfileDTO))

    api.setHeader('Content-Type', "") 
    api.setHeader('Accept', "application/json")
    return api.post('api/update/user-profiles', formData)
  }
  const deleteUserProfile = (userProfileId) => api.delete('api/user-profiles/' + userProfileId, headers)
  const searchUserProfiles = (query) => api.get('api/_search/user-profiles', { query: query }, headers)

  const getEvent = (eventId) => api.get('api/events/' + eventId, headers)
  
  const getEvents = (profile, pageable) => {
    const today = new Date()
    const criteria = { 'userProfileId.equals': profile ? profile.id : null, 'eventDate.greaterOrEqualThan' : today }
    const ret =  api.get('api/events', { ...criteria, ...pageable }, headers)

    return ret
  }
  const createEvent = (event) => api.post('api/events', event, headers)
  const updateEvent = (event) => api.put('api/events', event, headers)

  const updateEventWithLocalImage = (event) => {
    let formData = new FormData()
    
    if(event.imageUrl) {
      formData.append('image', {  
        uri: event.imageUrl, //file path string
        name: 'eventImage.jpg',
        //type: userProfile.imageDescriptor.mime
      })
    }

    formData.append('event', JSON.stringify(event))

    api.setHeader('Content-Type', "") 
    api.setHeader('Accept', "application/json")
    return api.post('api/update/event', formData)
  }

  const deleteEvent = (eventId) => api.delete('api/events/' + eventId, headers)
  const searchEvents = (query) => api.get('api/_search/events', { query: query }, headers)

  const getInvitee = (inviteeId) => api.get('api/invitees/' + inviteeId, headers)
  const getInvitees = (options) => api.get('api/invitees', options, headers)
  const createInvitee = (invitee) => api.post('api/invitees', invitee, headers)
  const updateInvitee = (invitee) => api.put('api/invitees', invitee, headers)
  const deleteInvitee = (inviteeId) => api.delete('api/invitees/' + inviteeId, headers)
  const searchInvitees = (query) => api.get('api/_search/invitees', { query: query }, headers)

  const getFriend = (friendId) => api.get('api/friends/' + friendId, headers)
  const getFriends = (options) => api.get('api/friends/my-friends', options, headers)
  const createFriend = (friend) => api.post('api/friends', friend, headers)
  const createFriends = (friends) => api.post('api/friends/request-friends', friends, headers)
  const updateFriend = (friend) => api.put('api/friends', friend, headers)
  const deleteFriend = (friendId) => api.delete('api/friends/' + friendId, headers)
  const searchFriends = (query) => api.get('api/_search/friends', { query: query }, headers)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createUserProfile,
    updateUserProfile,
    getUserProfiles,
    getUserProfile,
    getCurrentUserProfile,
    deleteUserProfile,
    searchUserProfiles,
    getUserProfilesSansFriends,

    createEvent,
    updateEvent,
    updateEventWithLocalImage,
    getEvents,
    getEvent,
    deleteEvent,
    searchEvents,

    createInvitee,
    updateInvitee,
    getInvitees,
    getInvitee,
    deleteInvitee,
    searchInvitees,

    createFriend,
    createFriends,
    updateFriend,
    getFriends,
    getFriend,
    deleteFriend,
    searchFriends,
    updateUserProfileWithLocalImage,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
