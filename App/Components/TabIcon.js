
import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'

export default class TabIcon extends React.Component {

    static propTypes = {
        selected: PropTypes.bool,
        iconName: PropTypes.string,
        title: PropTypes.string
    }

    constructor (props) {
        super(props);
    }

    render() {
      var color = this.props.selected ? '#FFFFFF' : '#301c2a';
  
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
          <Icon style={{color: color}} name={this.props.iconName} size={20}/>
        </View>
      );
    }
}