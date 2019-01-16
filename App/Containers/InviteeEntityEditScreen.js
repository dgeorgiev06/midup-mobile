import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import InviteeActions from '../Redux/InviteeRedux'
import UserProfileActions from '../Redux/UserProfileRedux'
import EventActions from '../Redux/EventRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/InviteeEntityEditScreenStyle'

let Form = t.form.Form

class InviteeEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        status: t.maybe(t.Number),
        userProfileId: this.getUserProfiles(),
        eventId: this.getEvents()
      }),
      formValue: { },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userProfileId: {
            label: 'UserProfile'
          },
          eventId: {
            label: 'Event'
          },
          status: {
          }
        }
      },
      success: false,
      invitee: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getInvitee(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
    this.props.getAllUserProfiles()
    this.props.getAllEvents()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.invitee && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.invitee)
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
        this.props.getAllInvitees({page: 0, sort: 'id,asc', size: 20})
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
      userProfileId: value.userProfileId || null,
      eventId: value.eventId || null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      status: value.status || null,
      userProfileId: value.userProfileId || null,
      eventId: value.eventId || null
    }
  }

  getUserProfiles = () => {
    const userProfiles = {}
    this.props.userProfiles.forEach(userProfile => {
      userProfiles[userProfile.id] = userProfile.id ? userProfile.id.toString() : userProfile.id.toString()
    })
    return t.maybe(t.enums(userProfiles))
  }
  getEvents = () => {
    const events = {}
    this.props.events.forEach(event => {
      events[event.id] = event.eventName ? event.eventName.toString() : event.id.toString()
    })
    return t.maybe(t.enums(events))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const invitee = this.refs.form.getValue()
    if (invitee) { // if validation fails, value will be null
      this.props.updateInvitee(this.formValueToEntity(invitee))
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
    events: state.events.events || [],
    invitee: state.invitees.invitee,
    fetching: state.invitees.fetchingOne,
    updating: state.invitees.updating,
    error: state.invitees.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileAllRequest(options)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    getInvitee: (id) => dispatch(InviteeActions.inviteeRequest(id)),
    getAllInvitees: (options) => dispatch(InviteeActions.inviteeAllRequest(options)),
    updateInvitee: (invitee) => dispatch(InviteeActions.inviteeUpdateRequest(invitee))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteeEntityEditScreen)
