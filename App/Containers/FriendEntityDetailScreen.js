import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import FriendActions from '../Redux/FriendRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/FriendEntityDetailScreenStyle'

class FriendEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      friend: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getFriend(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.friend) {
      this.setState({ friend: newProps.friend })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllFriends()
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
      'Delete Friend?',
      'Are you sure you want to delete the Friend?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteFriend(this.props.entityId)
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
        <Text>ID: {this.state.friend.id}</Text>
        <Text>Status: {this.state.friend.status}</Text>
        <Text>FriendshipRequestDate: {this.state.friend.friendshipRequestDate}</Text>
        <Text>FriendshipStartDate: {this.state.friend.friendshipStartDate}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.friendEntityEdit.bind(this, { entityId: this.state.friend.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friend: state.friends.friend,
    deleting: state.friends.deleting,
    errorDeleting: state.friends.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFriend: (id) => dispatch(FriendActions.friendRequest(id)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    deleteFriend: (id) => dispatch(FriendActions.friendDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendEntityDetailScreen)
