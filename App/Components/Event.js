import React from 'react'
import PropTypes from 'prop-types'
import { Image, Dimensions } from 'react-native'
import { Card, CardItem, Left, Body, Text } from 'native-base'

const defaultImage = require('../Images/event.jpg')
const { width, height } = Dimensions.get('window')

export default class Event extends React.Component {

  static options = {  
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    venue: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    organizer: PropTypes.string
  }

  render () {
    const { width } = Dimensions.get('window');
    let image = defaultImage
    if( this.props.image ) {
        image = { uri: this.props.image }
    }

    let date = new Date(this.props.date)
   
    return (
        <Card transparent>
            <CardItem>
                <Left style={{flex:0.8}}>
                    <Body>
                        <Text style={{fontWeight:'400',fontSize:17}}>{this.props.name} by {this.props.organizer}</Text>
                        <Text note style={{fontWeight:'400', fontSize:14}}>{date.toLocaleString('en-us', Event.options)}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={ image } style={{ width: width, height: width/1.5 }} resizeMode={"cover"} />
            </CardItem>
            <CardItem content>
                <Left>
                    <Body>
                        <Text style={{fontWeight:'400',fontSize:14}}>{this.props.venue}</Text>
                        <Text style={{fontWeight:'400',fontSize:14}}>{this.props.address}</Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    )
  }
}
