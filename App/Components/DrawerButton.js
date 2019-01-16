import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DrawerButtonStyles'

class DrawerButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render () {
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default DrawerButton
