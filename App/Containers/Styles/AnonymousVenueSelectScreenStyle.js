import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Metrics.navBarHeight,
    backgroundColor: 'white'
  },
  matchParent: {
    flex: 1,
  },
  addressView: {
    position: "absolute",
    width: deviceWidth - 25,
    top: (deviceHeight / 25),
    left: deviceWidth / 22
  }
})