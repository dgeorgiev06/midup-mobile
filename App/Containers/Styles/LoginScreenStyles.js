import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    marginTop: Metrics.screenHeight / 4,
    padding: 20,
    backgroundColor: Colors.snow
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 0,
    borderColor: Colors.charcoal,
    backgroundColor: 'white',
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: '#505362',
    fontSize: 18,
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
