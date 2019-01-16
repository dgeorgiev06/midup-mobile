import React from 'react'
import { Alert, ScrollView, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import EventActions from '../Redux/EventRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Profiles from '../Components/Profiles'
import Event from '../Components/Event'

// Styles
import styles from './Styles/EventEntityEditSummaryScreenStyle'

class EventEntityEditSummaryScreen extends React.Component {
    static onEnter () {
        NavigationActions.refresh({
            rightTitle: 'Create',
            onRight: () => {
                NavigationActions.refs.eventEntityEditSummary.getWrappedInstance().createEvent()
            }
        })
    }
    
    constructor (props) {
        super(props)
        this.state = {
            updating: false,
            requesting: false
        }
    }

    componentWillMount () {
        
    }

    componentWillReceiveProps (newProps) {
        if (this.state.requesting && newProps.updating === false) {
            if (!newProps.errorUpdating) {
                this.setState({
                    success: false,
                    requesting: false
                })
                this.props.getAllEvents()
                NavigationActions.popTo('eventList')
            } else {
                Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
                this.setState({
                    success: false,
                    requesting: false
                })
            }
        }
    }

    createEvent () {
        this.setState({
            success: false,
            requesting: true
        })
    
        if (this.props.event) { // if validation fails, value will be null
            const event = Object.assign({invitees: this.props.invitees}, this.props.event)
            this.props.updateEvent(event)
        }
    }

    render () {
        const event = this.props.event
        if(!event) {
            return null
        }

        return (
            <ScrollView style={styles.container}>
                <Event name={event.eventName} date={event.eventDate.toDateString()} venue={event.venueName} address={event.address} image={event.imageUrl} organizer={this.props.userProfile.userLogin}/>
                <View style={styles.activityIndicatorView}>
                    <ActivityIndicator animating={this.state.requesting} color = '#bc2b78' size = "large"/>
                </View>
                <Profiles sections={[{title: 'invitees', data: this.props.invitees}]} />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfiles.currentUserProfile,
    updating: state.events.updating,
    errorUpdating: state.events.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event)),
    getAllEvents: () => dispatch(EventActions.eventAllRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(EventEntityEditSummaryScreen)
