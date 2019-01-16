import React from 'react'
import { Alert, Animated, Image, TouchableOpacity, ActionSheetIOS, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import UserProfileActions from '../Redux/UserProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  View,
  Left,
  Right,
  Icon
} from "native-base";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import ImagePicker from 'react-native-image-crop-picker'

const defaultImage = require('../Images/avatar.png')

// Styles
import styles from './Styles/UserProfileEntityEditScreenStyle'

class UserProfileEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: new Animated.Value(0),
      overflow: 'visible',
      image: defaultImage,
      success: false,
      address: {},
      requesting: false,
      imagePath: null
    }

    this.submitUpdate = this.submitUpdate.bind(this)
  }

  componentDidMount () {
    const { imageUrl, address, login, addressLatitude, addressLongitude } = this.entityToValues(this.props.userProfile)
    this.setState({
      image: imageUrl ? {uri: imageUrl} :  defaultImage,
      address: address,
      addressLongitude: addressLongitude,
      addressLatitude: addressLatitude,
      login: login,
      imagePath: null,
      imageUrl: imageUrl
    })
    this.autoCompleteRef.setAddressText(address)
  }

  componentWillReceiveProps (newProps) {

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating your profile', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.setState({
          success: true,
          requesting: false,
          address: {},
          image: null,
          login: null
        })
        Alert.alert('Success', 'Profile saved successfully', [{text: 'OK'}])
        NavigationActions.pop()
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToValues = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      imageUrl: value.imageUrl || null,
      userId: value.userId,
      address: value.address ? value.address : null,
      addressLongitude: value.addressLongitude ? value.addressLongitude : null,
      addressLatitude: value.addressLatitude ? value.addressLatitude : null,
      login: value.userLogin ? value.userLogin : null
    }
  }

  handlePressCancel () {
    NavigationActions.pop()
  }

  submitUpdate () {
    
    const profile = {
      id: this.props.userProfile.id,
      userId: this.props.account.id,
      address: this.state.address ? this.state.address : null,
      addressLatitude: this.state.addressLatitude ? this.state.addressLatitude : null,
      addressLongitude: this.state.addressLongitude ? this.state.addressLongitude : null,
      imageUrl: this.state.imagePath ? this.state.imagePath : this.state.imageUrl,
    }

    this.setState({
      success: false,
      requesting: true
    })

    this.props.updateUserProfile(profile)
  }

  renderAutoCompleteInput = () => {

    return(
      <GooglePlacesAutocomplete  
        styles={{        
          textInputContainer: {
            borderTopWidth: 0,
            borderBottomWidth: 1,
            backgroundColor: 'transparent',
          },
          textInput: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            color: '#5d5d5d',
            fontSize: 16,
            borderRadius: 20,
            borderTopWidth: .1,
            borderBottomWidth: .1,
            borderLeftWidth: .1,
            borderRightWidth: .1, 
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}
        ref ={(instance) => { this.autoCompleteRef = instance}}
        placeholder='Home Address'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
          if (data) { // if validation fails, value will be null
            this.setState( { address: data.description, addressLatitude: details.geometry.location.lat, addressLongitude: details.geometry.location.lng} );
          }
        }}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyAykwjnB8Z2R1ElVJ1TescPUJeBaDDi8gk',
          language: 'en', // language of the results
          types: '' // default: 'geocode'
        }}    
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        filterReverseGeocodingByTypes={['neighborhood', 'locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      /> 
  )}

  _startAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.height, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(this.state.height, {
        toValue: 150,
        duration: 500,
        delay: 75
      })
    ]).start()
  }

  _getImageFromStorage = (image) => {
    this.setState({imagePath : image.path, image: {uri: image.path}}) 
  }

  _onPressImage = () => {
    const options = [
      'Open camera',
      'Select from the gallery',
      'Cancel'
    ]
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          ImagePicker.openCamera({}).then((image) =>
            this._getImageFromStorage(image)
          )
        } else if (buttonIndex === 1) {
          ImagePicker.openPicker({}).then((image) =>
            this._getImageFromStorage(image)
          )
        }
      }
    )
  }

  render () {
   
    return (
      <Container style={styles.background}>
        <Content>
          <View>
            <View style={styles.profileImageView}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image borderRadius={20} source={this.state.image} style={styles.profileImage} />
                <TouchableOpacity onPress={this._onPressImage}>
                  <View style={styles.profileImageEditView}>
                    <Icon name="ios-camera" style={styles.editCamIcon} />
                    <Text style={{ fontSize: 15 }}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{paddingTop: 10}}>{this.state.login}</Text>
              </View> 
            </View>
            <View style={styles.activityIndicatorView}>
              <ActivityIndicator animating={this.state.requesting} color = '#bc2b78' size = "large"/>
            </View>
            <View style={styles.infoContainerView}>
              { this.renderAutoCompleteInput() }
            </View>
          </View>
        </Content>
        <Footer>
          <Left style={{ alignItems: "center" }}>
            <Button transparent onPress={() => {this.submitUpdate()}}>
              <Text style={styles.footerText}>Update</Text>
            </Button>
          </Left>
          <Right style={{ alignItems: "center" }}>
            <Button transparent onPress={() => {this.handlePressCancel()}}>
              <Text style={styles.footerText}>Cancel</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users || [],
    account: state.account.account,
    userProfile: state.userProfiles.currentUserProfile,
    fetching: state.userProfiles.fetchingOne,
    updating: state.userProfiles.updating,
    error: state.userProfiles.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (userProfile) => dispatch(UserProfileActions.userProfileUpdateRequest(userProfile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEntityEditScreen)
