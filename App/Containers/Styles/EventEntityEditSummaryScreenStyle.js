import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  activityIndicatorView: {
    position: "absolute",
    top: (deviceWidth / 2),
    left: deviceWidth / 2.4
  }
})