export default {
  // Functions return fixtures

  // entity fixtures

  updateUserProfile: (userProfile) => {
    return {
      ok: true,
      data: require('../Fixtures/updateUserProfile.json')
    }
  },
  getUserProfiles: () => {
    return {
      ok: true,
      data: require('../Fixtures/getUserProfiles.json')
    }
  },
  getUserProfile: (userProfileId) => {
    return {
      ok: true,
      data: require('../Fixtures/getUserProfile.json')
    }
  },
  deleteUserProfile: (userProfileId) => {
    return {
      ok: true
    }
  },
  searchUserProfiles: (query) => {
    return {
      ok: true,
      data: require('../Fixtures/searchUserProfiles.json')
    }
  },

  updateEvent: (event) => {
    return {
      ok: true,
      data: require('../Fixtures/updateEvent.json')
    }
  },
  getEvents: () => {
    return {
      ok: true,
      data: require('../Fixtures/getEvents.json')
    }
  },
  getEvent: (eventId) => {
    return {
      ok: true,
      data: require('../Fixtures/getEvent.json')
    }
  },
  deleteEvent: (eventId) => {
    return {
      ok: true
    }
  },
  searchEvents: (query) => {
    return {
      ok: true,
      data: require('../Fixtures/searchEvents.json')
    }
  },

  updateInvitee: (invitee) => {
    return {
      ok: true,
      data: require('../Fixtures/updateInvitee.json')
    }
  },
  getInvitees: () => {
    return {
      ok: true,
      data: require('../Fixtures/getInvitees.json')
    }
  },
  getInvitee: (inviteeId) => {
    return {
      ok: true,
      data: require('../Fixtures/getInvitee.json')
    }
  },
  deleteInvitee: (inviteeId) => {
    return {
      ok: true
    }
  },
  searchInvitees: (query) => {
    return {
      ok: true,
      data: require('../Fixtures/searchInvitees.json')
    }
  },

  updateFriend: (friend) => {
    return {
      ok: true,
      data: require('../Fixtures/updateFriend.json')
    }
  },
  getFriends: () => {
    return {
      ok: true,
      data: require('../Fixtures/getFriends.json')
    }
  },
  getFriend: (friendId) => {
    return {
      ok: true,
      data: require('../Fixtures/getFriend.json')
    }
  },
  deleteFriend: (friendId) => {
    return {
      ok: true
    }
  },
  searchFriends: (query) => {
    return {
      ok: true,
      data: require('../Fixtures/searchFriends.json')
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../Fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../Fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../Fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../Fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../Fixtures/getAccount.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
