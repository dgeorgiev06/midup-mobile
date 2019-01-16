import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

const styles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{iconId}',
    iconAllowOverlap: true,
    iconSize: Platform.OS === 'android' ? 1 : 0.50,
  }
});

class Members extends React.Component {
  static symbolID = 'members-symbol'

  static propTypes = {
    /**
     * FeatureCollection of points that we want to appear on the map.
     */
    featureCollection: PropTypes.object,

    /**
     * profile Images that we want to appear on the map.
     */
    images: PropTypes.object,
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
      <MapboxGL.ShapeSource id='members-source' images={this.props.images} shape={this.props.featureCollection}>
        <MapboxGL.SymbolLayer
          id={Members.symbolID}
          filter={['==', 'type', 'member']}
          style={styles.icon} />
      </MapboxGL.ShapeSource>
    );
  }
}

export default Members;
