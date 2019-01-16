import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  coverBlock: {
    height: deviceHeight / 4,
    width: deviceWidth
  },
  profileImgInnerView: {
    position: "absolute",
    top: (deviceWidth / 6),
    left: deviceWidth / 3,
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "#fff"
  },
  profileImg: {
    height: deviceWidth / 3 - 10,
    width: deviceWidth / 3 - 10
  },
  infoContainerView: {
    position: "absolute",
    top: (deviceWidth / 1.5 ),
    left: deviceWidth / 15,
    width: deviceWidth 
  },
  infoBlockView: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 0,
    alignItems: "center"
  },
  addressText: {
    color: "#697080",
    marginLeft: 15
  },
  label: {
    color: "black",
    marginLeft: 0,
    width: deviceWidth / 3 - 10
  },
  footerText: {
    color: "#505362"
  }
})
