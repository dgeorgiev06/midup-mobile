import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  buttonText: {
    fontSize: 18,
    color: Colors.jhipsterBlue,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
