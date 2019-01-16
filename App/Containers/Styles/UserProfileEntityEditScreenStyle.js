import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  background: {
    backgroundColor: "#fff"
  },
  formContainerView: {
    padding: 30,
    paddingTop: 20
  },
  inputGrp: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    marginBottom: 8
  },
  footerText: {
    color: "#505362"
  },
  profileImageView: {
    position: "absolute",
    top: (deviceWidth / 6),
    left: deviceWidth / 3,
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "#fff"
  },
  activityIndicatorView: {
    position: "absolute",
    top: (deviceWidth / 2),
    left: deviceWidth / 2.4
  },
  profileImage: {
    height: deviceWidth / 3 - 10,
    width: deviceWidth / 3 - 10
  },
  profileImageEditView: {
    position: "absolute",
    right: -40,
    bottom: 0,
    height: 25,
    width: 60,
    backgroundColor: "rgba(206,208,203,0.8)",
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 3
  },
  editCamIcon: {
    marginRight: 5,
    fontSize: 20
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
    marginBottom: 5,
    alignItems: "center"
  },
  infoText: {
    color: "#697080",
    marginLeft: 15
  },
  footerText: {
    color: "#505362"
  }
})
