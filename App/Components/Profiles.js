import React from 'react'
import { SectionList, Text, View } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Left } from 'native-base'
import { Metrics, Colors } from '../Themes'
// For empty lists
import AlertMessage from '../Components/AlertMessage'
const defaultProfileImage = require('../Images/avatar.png')
import PropTypes from 'prop-types'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

export default class Profiles extends React.PureComponent {

static propTypes = {
    sections: PropTypes.any
  }

  renderRow ({item}) {

    return (
        <Card transparent>
            <CardItem>
            <Left>
                <Thumbnail square source={item.imageUrl ? {uri: item.imageUrl} : defaultProfileImage } />
                <Body>
                  <Text>{item.userLogin}</Text>
                </Body>
            </Left>
            </CardItem>
        </Card>
    )
  }

  // Show this when data is empty
  renderEmpty = () =>
    <AlertMessage title='No profiles Found' />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => String(index)

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  renderSectionHeader({section}) {
    return(
      <View style={{flex: .8, marginTop: 1, flexDirection: 'row', backgroundColor: Colors.background}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{section.title}</Text>
      </View>  
    )
  }

  render () {
    return (
      <View>
        <SectionList
          contentContainerStyle={{marginTop: Metrics.baseMargin}}
          sections={this.props.sections}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }
}

