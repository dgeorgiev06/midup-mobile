import React, { Component } from 'react'
import {
  View,
  Platform,
  Alert
} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl';
import StoreLocatorKit from '../Components/mapbox';
import VenueActions from '../Redux/VenueRedux';
import AppConfig from '../Config/AppConfig'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line
import { blueTheme } from '../Themes/MapThemes'
import { createMapParameters } from '../Lib/DataModelUtils'
import { connect } from 'react-redux'
import { featureCollection } from '../Lib/FeatureUtils.js'
import VenueFeature from '../Services/dao/VenueFeature'
import isEqual from 'react-fast-compare'
import Members from '../Components/mapbox/components/Members'

// Styles
import styles from './Styles/VenueSelectScreenStyle'

const IS_IOS = Platform.OS === 'ios'

class VenueSelectScreen extends Component {

  static onEnter () {
    NavigationActions.refresh({
        rightTitle: 'Next',
        onRight: () => {
            NavigationActions.refs.venueSelect.getWrappedInstance().summary()
        }
    })
  }

  constructor (props) {
    super(props);

    this._mounted = false

    this.state = {
      isGranted: IS_IOS,
      activeTheme: blueTheme,
      center: [],
      radius: 20,
      mapboxAccessToken: AppConfig.mapboxAccessToken,
      requestingVenue: false,
      requestingVenues: false,
      inviteesImages: null,
      featureCollection: null
    }
    
    this.prepareMapData = this.prepareMapData.bind(this)
    this.venueSelected = this.venueSelected.bind(this)
    this.summary = this.summary.bind(this)
  }

  prepareMapData() {
    let images = {}
    if(this.props.invitees && this.props.invitees.length) {
      result = createMapParameters(this.props.invitees, 20)
      const invitees = this.props.invitees
      for(let i = 0; i < invitees.length; i++) {
          images[invitees[i].userLogin] = invitees[i].imageUrl ? {uri: invitees[i].imageUrl} : null
      }

      const origin = [invitees[0].addressLongitude, invitees[0].addressLatitude]

      if(this._mounted) {
        this.setState({
          origin: origin, 
          radius: result.radius,
          featureCollection: result.inviteesFeatureCollection, 
          inviteesImages: images, 
          center: result.center,
          bbox: result.bbox,
          requestingVenues: true
        })
    
        const coordinates = {lat: result.center.x, lng: result.center.y, radius: result.radius}
    
        this.props.requestVenues(coordinates);
      }
    }
  }

  componentWillUnmount() {
    this._mounted = false
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

      if (this.state.requestingVenue && !newProps.fetchingDetails) {
        if (newProps.error) {
          Alert.alert('Error', newProps.error, [{text: 'OK'}])
          this.setState({requestingVenue: false})
        } 
        else if(newProps.venues) {
          const collection = featureCollection(newProps.venues, VenueFeature)

          this.setState({
            venuesFeatureCollection: collection,
            requestingVenue: false
          });
        }
      }
    }
  }

  summary() {
    const selectedVenue = this.state.selectedVenue
    const event = Object.assign({}, this.props.event)
    if(selectedVenue) {
      event.address = selectedVenue.properties.addressFormatted
      event.venueName = selectedVenue.properties.name
      event.venueId = selectedVenue.googId
      event.eventOrganizerId = this.props.profile.id
    }

    const invitees = this.props.invitees.filter((invitee) => invitee.userProfileId > -1)
    NavigationActions.eventEntityEditSummary({event: event, invitees: invitees})
  }

  async componentDidMount () {
    if (!IS_IOS) {
      const isGranted = MapboxGL.requestAndroidLocationPermissions()
      this.setState({ isGranted: isGranted })
    }
    await MapboxGL.setAccessToken(this.state.mapboxAccessToken)

    this._mounted = true

    if(this.props.profile) {
      this.prepareMapData()
    }
  }

  venueSelected(feature) {
    const id = feature.id
    if(this._mounted) {
      this.setState({requestingVenue: true, selectedVenue: feature})
      this.props.requestVenue(id)
    }
  }

  renderMap () {
    if(!this.state.venuesFeatureCollection || !this.state.featureCollection || !this.state.origin)
      return null

    let inviteesFeatureCollection = this.state.featureCollection
    let inviteesImages = this.state.inviteesImages ? this.state.inviteesImages : {}
    
    return (
      <View style={styles.container}>
        <View style={styles.matchParent}>
          <StoreLocatorKit.MapView
            simulateUserLocation={true}
            onRegionWillChange={this.onRegionWillChange}
            accessToken={this.state.mapboxAccessToken}
            theme={this.state.activeTheme}
            origin={this.state.origin}
            centerCoordinate={[this.state.center.y, this.state.center.x]}
            featureCollection={this.state.venuesFeatureCollection}
            membersFeatureCollection={inviteesFeatureCollection}
            membersImages={inviteesImages}
            zoomLevel={50}
            bbox={this.state.bbox}
            radius={this.state.radius}
            onSelectedFeature={this.venueSelected}
            style={styles.matchParent}>

            <Members images={inviteesImages} featureCollection={inviteesFeatureCollection} /> 

          </StoreLocatorKit.MapView>  
        </View>
      </View>
    );
  }

  render () {
    if (!this.state.isGranted) {
      return null;
    }
    return (
      <View style={styles.matchParent}>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(VenueSelectScreen)