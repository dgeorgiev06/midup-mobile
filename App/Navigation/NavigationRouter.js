import React, { Component } from 'react'
import { Drawer, Scene, Router, Stack } from 'react-native-router-flux'
import styles from './Styles/NavigationContainerStyles'
import DrawerContent from '../Containers/DrawerContent'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import UserProfileEntityScreen from '../Containers/UserProfileEntityScreen'
import UserProfileEntityDetailScreen from '../Containers/UserProfileEntityDetailScreen'
import UserProfileEntityEditScreen from '../Containers/UserProfileEntityEditScreen'
import EventEntityScreen from '../Containers/EventEntityScreen'
import EventEntityDetailScreen from '../Containers/EventEntityDetailScreen'
import EventEntityEditScreen from '../Containers/EventEntityEditScreen'
import InviteeEntityScreen from '../Containers/InviteeEntityScreen'
import InviteeEntityDetailScreen from '../Containers/InviteeEntityDetailScreen'
import InviteeEntityEditScreen from '../Containers/InviteeEntityEditScreen'
import FriendEntityScreen from '../Containers/FriendEntityScreen'
import FriendEntityDetailScreen from '../Containers/FriendEntityDetailScreen'
import FriendEntityEditScreen from '../Containers/FriendEntityEditScreen'
import EventEntityEditSummaryScreen from '../Containers/EventEntityEditSummaryScreen'
import FriendInviteScreen from '../Containers/FriendInviteScreen'
import FriendRequestScreen from '../Containers/FriendRequestScreen'
import VenueSelectScreen from '../Containers/VenueSelectScreen'
import AnonymousVenueSelectScreen from '../Containers/AnonymousVenueSelectScreen'
import TabIcon from '../Components/TabIcon'
// ignite-jhipster-navigation-import-needle

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

//https://stackoverflow.com/questions/42853224/scene-tabs-react-native-router-flux-and-icons-react-native-vector-icons

//https://gist.github.com/rturk/858c1afaee170a3a141adc7da652883e

class NavigationRouter extends Component {

  render () {
    return (
      <Router>
        <Drawer hideNavBar headerTintColor={'white'} contentComponent={DrawerContent} navigationBarStyle={styles.navBar} titleStyle={styles.title}
          // these lines are a workaround for a react-navigation issue, remove after upgrading >4.0.0-beta.24
          drawerOpenRoute='DrawerOpen'
          drawerCloseRoute='DrawerClose'
          drawerToggleRoute='DrawerToggle'>
          
          <Stack key='root'>

            <Scene key='tabbar' hideNavBar={true} tabs activeTintColor='black' tabBarStyle={{backgroundColor: '#FFFFFF'}}>
              <Scene initial icon={TabIcon} iconName='ios-map' key='anonymousVenueSelect' component={AnonymousVenueSelectScreen} title='Map' />
              
              <Stack key='events' icon={TabIcon} iconName='ios-calendar' title='Events' >
                <Scene key='eventList' component={EventEntityScreen} title='Events'drawerLockMode='locked-closed'/>
                <Scene key='eventEntityDetail' component={EventEntityDetailScreen} title='Event' back drawerLockMode='locked-closed' />
                <Scene key='eventEntityEdit' component={EventEntityEditScreen} title='New Event' back drawerLockMode='locked-closed'/>
                <Scene key='friendInvite' component={FriendInviteScreen} title='Invite Friends' back drawerLockMode='locked-closed' />
                <Scene key='venueSelect' component={VenueSelectScreen} title='Select Venue' back drawerLockMode='locked-closed' />
                <Scene key='eventEntityEditSummary' component={EventEntityEditSummaryScreen} title='Recap' back drawerLockMode='locked-closed' />
              </Stack>
              <Scene key='tabBarFriends' hideNavBar={true} tabs title='Friends' icon={TabIcon} iconName='md-contacts' tabBarStyle={{backgroundColor: '#FFFFFF'}}>
                <Scene sectionValues={['accepted']} key='friendEntity' icon={TabIcon} iconName='md-contacts' component={FriendEntityScreen} title='Friends' drawerLockMode='locked-closed' />
                <Scene sectionValues={['pending']} key='friendsPending' icon={TabIcon} iconName='md-contacts' component={FriendEntityScreen} title='Requests' drawerLockMode='locked-closed' />
                <Scene key='friendRequest' icon={TabIcon} iconName='ios-search' component={FriendRequestScreen} title='Search' drawerLockMode='locked-closed' />
              </Scene>
            </Scene>

            <Scene key='friendEntityEdit' component={FriendEntityEditScreen} title='Friend' back drawerLockMode='locked-closed' />  
            <Scene key='login' component={LoginScreen} title='Login' />
            <Scene key='register' component={RegisterScreen} title='Register' back drawerLockMode='locked-closed' />
            <Scene key='settings' component={SettingsScreen} title='Settings' back drawerLockMode='locked-closed' />
            <Scene key='changePassword' component={ChangePasswordScreen} title='Change Password' back drawerLockMode='locked-closed' />
            <Scene key='forgotPassword' component={ForgotPasswordScreen} title='Forgot Password' back drawerLockMode='locked-closed' />
         
			      <Scene key='userProfileEntity' component={UserProfileEntityScreen} title='UserProfiles' back drawerLockMode='locked-closed' />
            <Scene key='userProfileEntityDetail' component={UserProfileEntityDetailScreen} title='UserProfile' back drawerLockMode='locked-closed' />
            <Scene key='userProfileEntityEdit' component={UserProfileEntityEditScreen} title='UserProfile' drawerLockMode='locked-closed' />
            <Scene key='inviteeEntity' component={InviteeEntityScreen} title='Invitees' back drawerLockMode='locked-closed' />
            <Scene key='inviteeEntityDetail' component={InviteeEntityDetailScreen} title='Invitee' back drawerLockMode='locked-closed' />
            <Scene key='inviteeEntityEdit' component={InviteeEntityEditScreen} title='Invitee' back drawerLockMode='locked-closed' /> 
            {/* ignite-jhipster-navigation-needle */}
          </Stack>
        </Drawer>
      </Router>
    )
  }
}

export default NavigationRouter
