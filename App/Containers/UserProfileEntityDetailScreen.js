import React from 'react'
import { Alert, View, Image, Animated } from 'react-native'
import { connect } from 'react-redux'
import UserProfileActions from '../Redux/UserProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {
  Container,
  Content,
  Text,
  Button,
  Left,
  Right,
  Footer,
} from 'native-base';

// Styles
import styles from './Styles/UserProfileEntityDetailScreenStyle'

const defaultImage = require('../Images/avatar.png')

class UserProfileEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      deleting: false,
      height: new Animated.Value(0),
      overflow: 'visible'
    }
  }

  componentWillMount () {
    if(this.props.entityId) {
      this.props.getUserProfile(this.props.entityId)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.userProfile) {
      this.setState({ 
        userProfile: newProps.userProfile, 
      })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllUserProfiles()
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
      'Delete UserProfile?',
      'Are you sure you want to delete the UserProfile?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteUserProfile(this.props.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  renderFooter () {

    if(this.props.entityId !== this.props.currentUserProfile.id) {
      return null
    }

    return(
      <Footer>
        <Left style={{ alignItems: "center" }}>
          <Button transparent onPress={NavigationActions.userProfileEntityEdit.bind(this, { entityId: this.props.entityId })}>
            <Text style={styles.footerText}>Edit</Text>
          </Button>
        </Left>
        <Right style={{ alignItems: "center" }}>
          <Button transparent onPress={this.confirmDelete}>
            <Text style={styles.footerText}>Delete</Text>
          </Button>
        </Right>
      </Footer>
    )
  }

  render() {

    const userProfile = this.state.userProfile
    if(!userProfile) {
      return null
    }
    let address = userProfile ? userProfile.address : 'No addressed specified'
    const profileImg = userProfile && userProfile.imageUrl ? {uri: userProfile.imageUrl} : defaultImage

    return (
      <Container> 
        <Content style={{ backgroundColor: "#fff" }}>
          <View>
            <View style={styles.profileImgInnerView}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image borderRadius={20} source={profileImg} style={styles.profileImg} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{paddingTop: 10}}>{userProfile.userLogin}</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoContainerView}>
            <View style={styles.infoBlockView}>
              <Text style={styles.label}>Address:</Text>
            </View>
            <View style={styles.infoBlockView}>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </View>
         
        </Content>
        {this.renderFooter()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfiles.userProfile,
    currentUserProfile: state.userProfiles.currentUserProfile,
    deleting: state.userProfiles.deleting,
    errorDeleting: state.userProfiles.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (id) => dispatch(UserProfileActions.userProfileRequest(id)),
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileAllRequest(options)),
    deleteUserProfile: (id) => dispatch(UserProfileActions.userProfileDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEntityDetailScreen)
