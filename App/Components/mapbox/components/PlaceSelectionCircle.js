import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import circle from '@turf/circle'

const layerStyles = MapboxGL.StyleSheet.create({
    route: {
        lineColor: '#99CCFF',
        lineWidth: 3,
        lineOpacity: 0.84,
        lineDasharray: [2, 2],
    },
});

class PlaceSelectionCircle extends React.Component {
    static symbolID = 'members-symbol';
    static propTypes = {
        center: PropTypes.any,

        radius: PropTypes.number,

        options: PropTypes.object
    };

    static defaultProps = {
        radius: 20,
        options: {steps: 30, units: 'miles', properties: {}}
    };

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        const center = nextProps.center
        const radius = nextProps.radius
        const options = nextProps.options

        if(center && radius) {
            const c = circle(center, radius, options)
            this.setState({circle: c})
        }
    }

    render() {

        if(!this.state.circle) {
            return null
        }

        return (
            <MapboxGL.ShapeSource id='placeSelectionSource' shape={this.state.circle}>
                <MapboxGL.LineLayer id='routeFill' style={layerStyles.route} />
            </MapboxGL.ShapeSource>
        );
    }
}

export default PlaceSelectionCircle;