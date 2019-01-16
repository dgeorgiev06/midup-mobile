import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Metrics.navBarHeight,
    backgroundColor: 'white'
  },
  matchParent: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    width: 150,
    backgroundColor: Colors.jhipsterBlue,
    borderColor: Colors.jhipsterBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonView: {
    justifyContent:'center',
    paddingTop: 10
  },
})