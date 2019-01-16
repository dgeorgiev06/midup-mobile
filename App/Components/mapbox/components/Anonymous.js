import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
const defaultImage = require('../../../Images/person-128.png')

const styles = MapboxGL.StyleSheet.create({
  
  anonymousIcon: {
    iconAllowOverlap: true,
    iconSize: Platform.OS === 'android' ? 1 : 0.5,
    iconImage: defaultImage,
    iconOffset: [-25, 0]
  }
});

class Anonymous extends React.Component {
  
  static anonymousSymbolID = 'anonimous-symbol'

  static propTypes = {
    /**
     * FeatureCollection of points that we want to appear on the map.
     */
    featureCollection: PropTypes.object,
  };

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    
  }

  render () {
    if (!this.props.featureCollection) {
      return null;
    }
    return (
      <MapboxGL.ShapeSource id='members-source' shape={this.props.featureCollection}>
        <MapboxGL.SymbolLayer
          id={Anonymous.anonymousSymbolID}
          filter={['==', 'type', 'anonymous']}
          style={styles.anonymousIcon} />  
      </MapboxGL.ShapeSource>
    );
  }
}

export default Anonymous;