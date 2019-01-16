import React from 'react'
import { Alert, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from '../Redux/EventRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImageFactory from 'react-native-image-picker-form'
import t from 'tcomb-form-native'

// Styles
import styles from './Styles/EventEntityEditScreenStyle'

let Form = t.form.Form

class EventEntityEditScreen extends React.Component {

  static onEnter () {
    NavigationActions.refresh({
      rightTitle: 'Next',
      onRight: () => {
        NavigationActions.refs.eventEntityEdit.getWrappedInstance().inviteFriends()
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        eventName: t.String,
        eventDate: t.Date,
        image: t.maybe(t.String)
      }),
      formValue: { },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userProfileId: {
            hidden: true
          },
          eventName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('eventDate').refs.input.focus()
          },
          eventDate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('image').refs.input.focus()
          },
          image: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('venueId').refs.input.focus(),
            config: {
              title: 'Select Image',
              options: ['Open Camera', 'Select From Gallery', 'Cancel'],
              style: {
                titleFontFamily: 'Roboto'
              }
            },
            error: 'No image provided',
            factory: ImageFactory
          }
        }
      },
      success: false,
      event: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
    this.inviteFriends = this.inviteFriends.bind(this)
  }

  async componentDidMount () {
    if (this.props.entityId) {
      await this.props.getEvent(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.event && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.event)
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
        this.props.getAllEvents({page: 0, sort: 'id,asc', size: 20})
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
      eventName: value.eventName || null,
      eventDate: value.eventDate || null,
      image: value.image || null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      eventName: value.eventName || null,
      eventDate: value.eventDate || null,
      userProfileId: this.props.userProfile.id,
      imageUrl: value.image || null
    }
  }

  inviteFriends () {
    const event = this.refs.form.getValue()
    if(event) {
      NavigationActions.friendInvite({ event: this.formValueToEntity(event) })
    }
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const event = this.refs.form.getValue()
    if (event) { // if validation fails, value will be null
      this.props.updateEvent(this.formValueToEntity(event))
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
        <View style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    fetching: state.events.fetchingOne,
    updating: state.events.updating,
    error: state.events.errorUpdating,
    userProfile: state.userProfiles.currentUserProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(EventEntityEditScreen)
