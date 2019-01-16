import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { View, PixelRatio, Platform } from 'react-native';

import Directions from './Directions';
import CurrentLocation from './CurrentLocation';
import Places from './Places';
import PlaceSelectionCircle from './PlaceSelectionCircle'
import Cards from './Cards';
import Theme from './Theme';
import DirectionType from '../enums/DirectionType';

const IS_ANDROID = Platform.OS === 'android';
const BOUNDS_PADDING_SIDE = IS_ANDROID ? PixelRatio.getPixelSizeForLayoutSize(30) : 30;
const BOUNDS_PADDING_TOP = IS_ANDROID ? PixelRatio.getPixelSizeForLayoutSize(50) : 50;
const BOUNDS_PADDING_BOTTOM = IS_ANDROID ? PixelRatio.getPixelSizeForLayoutSize(150) : 150;

class MapView extends React.Component {
  static propTypes = {
    ...MapboxGL.MapView.propTypes,

    /**
     * Mapbox access token
     */
    accessToken: PropTypes.string.isRequired,

    /**
     * Theme applied to map, see Theme.js for more information
     */
    theme: PropTypes.instanceOf(Theme).isRequired,

    /**
     * Type of directions that get requested from API, possible direction types are
     * possible for driving, walking, and cycling.
     */
    directionType: PropTypes.oneOf([
      'mapbox/driving-traffic',
      'mapbox/walking',
      'mapbox/cycling',
      'mapbox/driving-traffic',
    ]),

    /**
     * FeatureCollection of points that we want to appear on the map.
     */
    featureCollection: PropTypes.object,

    /**
     * Mocks user location to be the center coordinate on the map
     */
    simulateUserLocation: PropTypes.bool,

    origin: PropTypes.any,

    onSelectedFeature: PropTypes.func,

    radius: PropTypes.number,

    bbox: PropTypes.any,

    onLongPress: PropTypes.func,

    onRequestToRemoveMember: PropTypes.func,

    centerCoordinate: PropTypes.any,

    onPress: PropTypes.func,

    onPressLayerId: PropTypes.any,
  };

  static defaultProps = {
    directionType: DirectionType.Default,
  }

  constructor (props) {
    super(props);

    let destination = null, activeID = -1;
    if (this.props.featureCollection && this.props.featureCollection.features.length > 0) {
      if(this.props.featureCollection.features[0]) {
        destination = this.props.featureCollection.features[0].geometry.coordinates;
        activeID = this.props.featureCollection.features[0].id;
      }
    }

    this.state = {
      activeIndex: 0,
      activeID: activeID,
      origin: null,
      region: null,
      layout: null,
      destination: destination
    };

    this.onPress = this.onPress.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onDirectionsFetched = this.onDirectionsFetched.bind(this);
    this.onActiveIndexChange = this.onActiveIndexChange.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onRegionWillChange = this.onRegionWillChange.bind(this);
  }

  componentDidMount() {
    if(this.props.origin) {
      this.setState({origin: this.props.origin})
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.featureCollection && newProps.featureCollection.features) {
      if(!this.props.featureCollection || !this.featuresAreEqual(newProps.featureCollection.features, this.props.featureCollection.features)) {
        if(newProps.bbox) {
          this.fitBounds(newProps.bbox)
        }

        this.setState({
          destination: newProps.featureCollection.features[0].geometry.coordinates,
          activeIndex: 0,
          activeID: newProps.featureCollection.features[0].id,
        })
      }
    }

    if(newProps.origin) {
      this.setState({
        origin: newProps.origin
      })
    }
  }

  featuresAreEqual(features1, features2) {
    let map = new Map()
    if(features1.length == features2.length) {
      for(let i=0; i < features1.length; i++) {
        map.set(features1[i].id, features1[i]) 
      }
      for(let i=0; i < features2.length; i++) {
        if(!map.get(features2[i].id)) {
          return false
        }
      }

      return true
    }
    else {
      return false
    }
  }

  onLayout (e) {
    const layout = e.nativeEvent.layout;
    this.setState({ layout: layout });
  }

  onLongPress = (pressFeature) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(pressFeature)
    }
  }

  async featureAtPressedPoint(pressFeature, layerId) {
    const { screenPointX, screenPointY } = pressFeature.properties;

    const hitFeatureCollection = await this.map.queryRenderedFeaturesAtPoint([screenPointX, screenPointY], null, [
      layerId,
    ]);

    let feature = null;
    if (hitFeatureCollection.features.length > 0) {
      feature = hitFeatureCollection.features[0];
    }

    return feature
  }

  async onPress (pressFeature) {
    if (this.props.featureCollection) {
      const feature = await this.featureAtPressedPoint(pressFeature, Places.UnselectedSymbolID);
      if(feature) {
        for (let i = 0; i < this.props.featureCollection.features.length; i++) {
          const currentFeature = this.props.featureCollection.features[i];

          if (feature.id === currentFeature.id) {
            this.setState({
              activeIndex: i,
              isChangeFromPress: true,
              destination: feature.geometry.coordinates,
            });
            break;
          }
        }
      }
    }

    if(this.props.onPress && this.props.onPressLayerId) {
      const feature = await this.featureAtPressedPoint(pressFeature, this.props.onPressLayerId)

      if(feature) {
        this.props.onPress(feature)
      }
    }
  }

  onActiveIndexChange (index) {
    const feature = this.props.featureCollection.features[index];

    if (!feature) {
      return;
    }

    if(this.props.onSelectedFeature) {
      this.props.onSelectedFeature(feature)
    }

    this.setState({
      activeIndex: index,
      activeID: feature.id,
      isChangeFromPress: false,
      destination: feature.geometry.coordinates,
    });
  }

  onLocationChange (coord) {
    this.setState({ origin: coord });
  }

  onDirectionsFetched () {
    if(this.props.bbox) {
      this.fitBounds(this.props.bbox)
    }
  }

  fitBounds (boundingBox) {
    const padding = [
      BOUNDS_PADDING_TOP,
      BOUNDS_PADDING_SIDE,
      BOUNDS_PADDING_BOTTOM,
      BOUNDS_PADDING_SIDE,
    ];
    this.map.fitBounds([boundingBox[2], boundingBox[3]], [boundingBox[0], boundingBox[1]], padding, 200);
  }

  onRegionWillChange (regionFeature) {
    this.setState({ region: regionFeature });

    if (this.props.onRegionWillChange) {
      this.props.onRegionWillChange(regionFeature);
    }
  }

  get directionsStyle () {
    return {
      lineColor: this.props.theme.directionsLineColor,
    };
  }

  get placesStyle () {
    return {
      style: {
        iconImage: this.props.theme.icon,
      },
      activeStyle: {
        iconImage: this.props.theme.activeIcon,
      },
    };
  }

  get membersStyle () {
    return {
      style: {
        iconImage: this.props.theme.icon,
      }
    };
  }

  get currentLocationStyle () {
    return {
      innerCircleStyle: {
        circleColor: this.props.theme.directionsLineColor,
      },
      outerCircleStyle: {
        circleColor: this.props.theme.directionsLineColor,
      },
    };
  }

  render () {
    let mockUserLocation = null;

    if (this.props.simulateUserLocation) {
      mockUserLocation = this.state.origin;
    }

    let featureCollection = this.props.featureCollection ? this.props.featureCollection : null
    
    return (
      <View style={this.props.style} onLayout={this.onLayout}>
        <MapboxGL.MapView
          ref={c => this.map = c}
          zoomLevel={this.props.zoomLevel}
          styleURL={this.props.theme.styleURL}
          centerCoordinate={this.props.centerCoordinate}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          onRegionWillChange={this.onRegionWillChange}
          style={{ flex: 1 }}>

          {this.props.children}

          {
            this.state.origin !== null && this.state.destination !== null &&

            <Directions
              accessToken={this.props.accessToken}
              origin={this.state.origin}
              destination={this.state.destination}
              onDirectionsFetched={this.onDirectionsFetched}
              style={this.directionsStyle} />
          }

          {
            featureCollection !== null &&

            <Places
              featureCollection={featureCollection}
              activeIndex={this.state.activeIndex}
              activeID={this.state.activeID}
            {...this.placesStyle} />
          }

          {
            this.props.centerCoordinate !== null && this.props.radius !== null && 

            <PlaceSelectionCircle
              center={this.props.centerCoordinate}
              radius={this.props.radius}
            />
          }

          {
            this.state.origin !== null && 

            <CurrentLocation
              mockUserLocation={mockUserLocation}
              onLocationChange={this.onLocationChange}
              {...this.currentLocationStyle} />
          }

        </MapboxGL.MapView>

        { 
          featureCollection !== null && 
        
          <Cards
            theme={this.props.theme}
            origin={this.state.origin}
            data={featureCollection.features}
            onActiveIndexChange={this.onActiveIndexChange}
            activeIndex={this.state.activeIndex} /> 
        }
      </View>
    );
  }
}

export default MapView;
