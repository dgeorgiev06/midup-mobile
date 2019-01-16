import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: 0
  },
  requestButton: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'white',
    marginTop: 15
  },
  requestText: {
    textAlign: 'center',
    color: '#505362',
    fontSize: 16,
    marginTop: 15
  },
  profileImage: {
    width: 50,
    height: 50
  }
})