import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import EventActions from '../Redux/EventRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Event from '../Components/Event'
import Profiles from '../Components/Profiles'
import { Container, Right, Footer, Icon, Button, Content } from 'native-base'
import { dataToSections } from '../Lib/DataModelUtils'

// Styles
import styles from './Styles/EventEntityDetailScreenStyle'

class EventEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      deleting: false
    }
  }

  componentWillMount () {
    if(this.props.entityId) {
      this.props.getEvent(this.props.entityId)
    }
  }

  integerToStringStatus(title) {
    switch(title) {
      case 0: 
        return 'pending'
      case 1:
        return 'accepted'
      case 2:
        return 'rejected'
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.event) {
      const invitees = newProps.event.invitees
      const sections = dataToSections(invitees, 'status', ['*'], this.integerToStringStatus)
      this.setState({ event: newProps.event, sections: sections })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllEvents()
        NavigationActions.pop()
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Event?',
      'Are you sure you want to delete the Event?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteEvent(this.props.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  renderFooter () {

    if(this.props.event && this.props.event.eventOrganizerId !== this.props.userProfile.id) {
      return null
    }

    return(
      <Right style={{ alignItems: "center" }}>
        <Button transparent onPress={this.confirmDelete}>
          <Icon name='ios-trash' color='black' fontSize={20}/>
        </Button>
      </Right>
    )
  }

  render () {
    const event = this.state.event
    
    if(!event) {
      return null
    }

    return (
      <Container>
        <Content>
          <Event name={event.eventName} date={event.eventDate} venue={event.venueName} address={event.address} image={event.imageUrl} organizer={event.eventOrganizerLogin}/>
          <Profiles sections={this.state.sections}/>
        </Content>
        <Footer backgroundColor='#FFFFFF' height={40}>
          { this.renderFooter() }
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    deleting: state.events.deleting,
    errorDeleting: state.events.errorDeleting,
    userProfile: state.userProfiles.currentUserProfile,
    updating: state.events.updating,
    errorUpdating: state.events.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    deleteEvent: (id) => dispatch(EventActions.eventDeleteRequest(id)),
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEntityDetailScreen)