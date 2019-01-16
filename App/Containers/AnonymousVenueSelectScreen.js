import React, { Component } from 'react'
import {
  View,
  Alert,
  Platform,
} from 'react-native';
import VenueActions from '../Redux/VenueRedux';
import AppConfig from '../Config/AppConfig'
import { blueTheme } from '../Themes/MapThemes'
import { connect } from 'react-redux'
import { featureCollection, createPointFeature } from '../Lib/FeatureUtils'
import Invitee from '../Services/dao/Invitee'
import Anonymous from '../Components/mapbox/components/Anonymous'
import { createMapParameters } from '../Lib/DataModelUtils'
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import StoreLocatorKit from '../Components/mapbox';
import isEqual from 'react-fast-compare'
import VenueFeature from '../Services/dao/VenueFeature'
import { Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
const IS_IOS = Platform.OS === 'ios'

// Styles
import styles from './Styles/AnonymousVenueSelectScreenStyle'

class AnonymousVenueSelectScreen extends Component {

  static onEnter () {
    NavigationActions.refresh({
      rightTitle: 'Reset',
      onRight: () => {
        NavigationActions.refs.anonymousVenueSelect.getWrappedInstance().reset()
      }
    })
  }

  constructor (props) {
    super(props);

    this._mounted = false

    this.state = {
      activeTheme: blueTheme,
      center: { x: 42.0409247, y: -74.1181971 },
      radius: 2,
      mapboxAccessToken: AppConfig.mapboxAccessToken,
      requestingVenue: false,
      requestingVenues: false,
      profileIdCounter: -999,
      invitees: [],
      isGranted: IS_IOS,
      featureCollection: null,
      venuesFeatureCollection: null
    }
  }

  reset = () => {


    const updatedInvitees = this.state.invitees.filter((item) => {
      if(item.userProfileId > -1) {
        return item
      }
    })

    if(this._mounted) {
      this.setState({
        center: { x: 42.0409247, y: -74.1181971 },
        radius: 2,
        requestingVenue: false,
        requestingVenues: false,
        profileIdCounter: -999,
        invitees: updatedInvitees ? updatedInvitees : [],
        featureCollection: null,
        venuesFeatureCollection: null
      }, () => this.prepareMapData())
    }
  }

  prepareMapData() {
    if(this.state.invitees && this.state.invitees.length) {
      const result = createMapParameters(this.state.invitees, 20)
      const invitees = this.state.invitees
      const origin = [invitees[0].addressLongitude, invitees[0].addressLatitude]

      if(this._mounted) {
        this.setState({
          origin: origin, 
          radius: result.radius,
          featureCollection: result.inviteesFeatureCollection,
          center: result.center,
          bbox: result.bbox,
          requestingVenues: true
        })
  
        const coordinates = {lat: result.center.x, lng: result.center.y, radius: result.radius}
    
        this.props.requestVenues(coordinates);
      }
    }
  }

  componentWillMount() {
    this._mounted = false
  }

  async componentDidMount () {
    if (!IS_IOS) {
      const isGranted = MapboxGL.requestAndroidLocationPermissions()
      this.setState({ isGranted: isGranted })
    }
    await MapboxGL.setAccessToken(this.state.mapboxAccessToken)
    this._mounted = true
  }

  componentWillReceiveProps (newProps) {
    if(this._mounted) {
      if (this.state.requestingVenues && !newProps.fetching) {
        if (newProps.error) {
          Alert.alert('Error', newProps.error, [{text: 'OK'}])
          this.setState({requestingVenues: false})
        } 
        else if(newProps.venues) {
          const venues = newProps.venues
          let venuesFeatureCollection = null

          if(!isEqual(venues, this.props.venues)) {

            if(venues && venues.length > 0) {
                venuesFeatureCollection = featureCollection(venues, VenueFeature)
                this.venueSelected(venuesFeatureCollection.features[0])
            }
          }

          this.setState( {
            venuesFeatureCollection: venuesFeatureCollection,
            requestingVenues: false
          } )
        }
      }

      if(newProps.profile && this.state.invitees.length == 0) {
        const profile = newProps.profile

        const invitees = [new Invitee(
          profile.id,
          profile.userLogin,
          profile.addressLongitude,
          profile.addressLatitude,
          "anonymous"
        )]

        if(this._mounted) {
          this.setState((prevState) => {
            return {
              invitees: [...prevState.invitees, ...invitees]
            }
          }, () => this.prepareMapData())
        }
      }

      if (this.state.requestingVenue && !newProps.fetchingDetails) {
        if (newProps.error) {
          Alert.alert('Error', newProps.error, [{text: 'OK'}])
          if(this._mounted) {
            this.setState({requestingVenue: false})
          }
        } 
        else if(newProps.venues) {
          const collection = featureCollection(newProps.venues, VenueFeature)

          if(this._mounted) {
            this.setState({
              venuesFeatureCollection: collection,
              requestingVenue: false
            })
          }
        }
      }
    }
  }

  venueSelected = (feature) => {
    if(feature) {
      const id = feature.id
      if(this._mounted) {
        this.setState({requestingVenue: true, selectedVenue: feature})
        this.props.requestVenue(id)
      }
    }
  }

  onLongPress = (pressFeature) => {

    let invitee = null

    if(pressFeature) {
      invitee = new Invitee(
        this.state.profileIdCounter,
        "user_" + this.state.profileIdCounter,
        pressFeature.geometry.coordinates[0],
        pressFeature.geometry.coordinates[1],
        "anonymous"
      )
    }

    if(this._mounted) {
      this.setState((prevState) => {
        return {
          requestingVenues: true,
          profileIdCounter: pressFeature ? prevState.profileIdCounter + 1 : prevState.profileIdCounter,
          invitees: invitee ? [...prevState.invitees, invitee] : [... prevState.invitees]
        }
      }, () => this.prepareMapData())
    }
  }

  onPress = (feature) => {
    if(feature) {
      const id = feature.id
      if(this.state.invitees) {
        const invitees = this.state.invitees.filter((invitee) => invitee.userProfileId !== id)
        if(this._mounted) {
          if(invitees && invitees.length) {
            this.setState({invitees: invitees}, () => this.prepareMapData())
          }
        }
      }
    }
  }

  renderAutoCompleteInput = () => {
    return(
        <GooglePlacesAutocomplete  
            styles={{        
                textInputContainer: {
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
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
            placeholder='Street, Neiborhood, City, or Full Address'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
                if (data) { // if validation fails, value will be null
                    this.onLongPress(createPointFeature(details.geometry.location.lng, details.geometry.location.lat));
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

  renderMap = () => {

    let inviteesFeatureCollection = this.state.featureCollection
    
    return (
      <View style={styles.matchParent}>
        <StoreLocatorKit.MapView
          simulateUserLocation={true}
          onLongPress={this.onLongPress}
          onPress={this.onPress}
          onRegionWillChange={this.onRegionWillChange}
          accessToken={this.state.mapboxAccessToken}
          theme={this.state.activeTheme}
          origin={this.state.origin}
          centerCoordinate={[this.state.center.y, this.state.center.x]}
          featureCollection={this.state.venuesFeatureCollection}
          zoomLevel={10}
          bbox={this.state.bbox}
          radius={this.state.radius}
          onSelectedFeature={this.venueSelected}
          onPressLayerId={Anonymous.anonymousSymbolID}
          style={styles.matchParent} >
          
          { inviteesFeatureCollection !== null && <Anonymous featureCollection={inviteesFeatureCollection} /> }

        </StoreLocatorKit.MapView>   
        <View style={styles.addressView}>
          {this.renderAutoCompleteInput()}
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.isGranted) {
      return null;
    }

    return (
      <View style={styles.container}>
        { this.renderMap() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.venues.fetching,
    error: state.venues.error,
    profile: state.userProfiles.currentUserProfile,
    venues: state.venues.venues,
    fetchingDetails: state.venues.fetchingDetails,
    venueDetails: state.venues.details
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestVenues: (center) => dispatch(VenueActions.venueRequest(center)),
    requestVenue: (id) => dispatch(VenueActions.venueDetailsRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(AnonymousVenueSelectScreen)