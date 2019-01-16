import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import InviteeActions from '../Redux/InviteeRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/InviteeEntityDetailScreenStyle'

class InviteeEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      invitee: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getInvitee(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.invitee) {
      this.setState({ invitee: newProps.invitee })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllInvitees()
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
      'Delete Invitee?',
      'Are you sure you want to delete the Invitee?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteInvitee(this.props.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.invitee.id}</Text>
        <Text>Status: {this.state.invitee.status}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.inviteeEntityEdit.bind(this, { entityId: this.state.invitee.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    invitee: state.invitees.invitee,
    deleting: state.invitees.deleting,
    errorDeleting: state.invitees.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInvitee: (id) => dispatch(InviteeActions.inviteeRequest(id)),
    getAllInvitees: (options) => dispatch(InviteeActions.inviteeAllRequest(options)),
    deleteInvitee: (id) => dispatch(InviteeActions.inviteeDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteeEntityDetailScreen)
