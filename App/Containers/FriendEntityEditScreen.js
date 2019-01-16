import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import FriendActions from '../Redux/FriendRedux'
import UserProfileActions from '../Redux/UserProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/FriendEntityEditScreenStyle'

let Form = t.form.Form

class FriendEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        status: t.maybe(t.String),
        friendshipRequestDate: t.maybe(t.Date),
        friendshipStartDate: t.maybe(t.Date),
        userProfileId: this.getUserProfiles(),
        userProfileId: this.getUserProfiles()
      }),
      formValue: { },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userProfileId: {
            label: 'FriendRequesting'
          },
          userProfileId: {
            label: 'FriendAccepting'
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('friendshipRequestDate').refs.input.focus()
          },
          friendshipRequestDate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('friendshipStartDate').refs.input.focus()
          },
          friendshipStartDate: {
          }
        }
      },
      success: false,
      friend: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getFriend(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
    this.props.getAllUserProfiles()
    this.props.getAllUserProfiles()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.friend && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.friend)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.setState({
          success: true,
          requesting: false,
          formValue: {}
        })
        Alert.alert('Success', 'Entity saved successfully', [{text: 'OK'}])
        this.props.getAllFriends({page: 0, sort: 'id,asc', size: 20})
        NavigationActions.pop()
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      status: value.status || null,
      friendshipRequestDate: value.friendshipRequestDate || null,
      friendshipStartDate: value.friendshipStartDate || null,
      userProfileId: value.userProfileId || null,
      userProfileId: value.userProfileId || null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      status: value.status || null,
      friendshipRequestDate: value.friendshipRequestDate || null,
      friendshipStartDate: value.friendshipStartDate || null,
      userProfileId: value.userProfileId || null,
      userProfileId: value.userProfileId || null
    }
  }

  getUserProfiles = () => {
    const userProfiles = {}
    this.props.userProfiles.forEach(userProfile => {
      userProfiles[userProfile.id] = userProfile.id ? userProfile.id.toString() : userProfile.id.toString()
    })
    return t.maybe(t.enums(userProfiles))
  }
  getUserProfiles = () => {
    const userProfiles = {}
    this.props.userProfiles.forEach(userProfile => {
      userProfiles[userProfile.id] = userProfile.id ? userProfile.id.toString() : userProfile.id.toString()
    })
    return t.maybe(t.enums(userProfiles))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const friend = this.refs.form.getValue()
    if (friend) { // if validation fails, value will be null
      this.props.updateFriend(this.formValueToEntity(friend))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProfiles: state.userProfiles.userProfiles || [],
    friend: state.friends.friend,
    fetching: state.friends.fetchingOne,
    updating: state.friends.updating,
    error: state.friends.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileAllRequest(options)),
    getFriend: (id) => dispatch(FriendActions.friendRequest(id)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    updateFriend: (friend) => dispatch(FriendActions.friendUpdateRequest(friend))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendEntityEditScreen)
