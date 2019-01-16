import React from 'react'
import { FlatList, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import FriendActions from '../Redux/FriendRedux'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line
import SearchBar from '../Components/SearchBar'
import { Card, CardItem, Thumbnail, Body, Left, Right, CheckBox } from 'native-base'
import Invitee from '../Services/dao/Invitee'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/FriendInviteScreenStyle'

class FriendInviteScreen extends React.PureComponent {

  static onEnter () {
    NavigationActions.refresh({
      rightTitle: 'Next',
      onRight: () => {
        NavigationActions.refs.friendInvite.getWrappedInstance().selectVenue()
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      loading: true,
      done: false,
      searchTerm: '',
      dataObjects: [],
      selectedFriends: new Map()
    }

    this.renderRow = this.renderRow.bind(this)
    this.selectVenue = this.selectVenue.bind(this)
  }
  
  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {

    const profileImageUrl = item.friendRequestingId === this.props.userProfile.id ? item.friendAcceptingImageUrl : item.friendRequestingImageUrl
    const login = item.friendRequestingId === this.props.userProfile.id ? item.friendAcceptingLogin : item.friendRequestingLogin

    return (
      <TouchableOpacity onPress={() => this.friendSelected(item)}>
        <Card transparent>
          <CardItem bordered>
            <Left>
              <Thumbnail square source={profileImageUrl ? {uri: profileImageUrl} : defaultImage } />
              <Body>
                <Text>{login}</Text>
              </Body>
            </Left>
            <Right>
              <CheckBox checked={this.state.selectedFriends.get(item.id)}/>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <SearchBar onSearch={this.performSearch} searchTerm={this.state.searchTerm} onCancel={this.cancelSearch} />

  // Render a footer?
  // renderFooter = () =>
  //  <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <AlertMessage title='No Friends Found' show={!this.props.fetching} />

  // renderSeparator = () =>
  //  <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => String(index)

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  cancelSearch = () => {
    this.setState({
      searchTerm: ''
    })
    this.fetchFriends()
  }

  performSearch = (query) => {
    if (query === '') {
      this.cancelSearch()
      return
    }
    this.setState({
      searchTerm: query
    })
    this.props.performSearch(query)
  }
  
  fetchFriends = () => {
    this.props.getAllFriends({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchFriends()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.friends) {
      const dataObjects = this.state.loading ? [...this.state.dataObjects, ...newProps.friends] : newProps.friends
      const selectedFriends = this.state.selectedFriends
      dataObjects.forEach(element => {
          if(!selectedFriends.get(element.id)) {
              selectedFriends.set(element.id, false)
          }
      })
      this.setState({
        done: newProps.friends.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.friends] : newProps.friends,
        loading: false,
        selectedFriends: selectedFriends
      })
    }
  }

  async componentDidMount () {
    await this.fetchFriends()
  }

  friendSelected = (item) => {
    let selectedFriends = this.state.selectedFriends
    selectedFriends.set(item.id, !selectedFriends.get(item.id))
    let dataObjects = this.state.dataObjects.slice(0) //need to change referrence in order for list to update
    this.setState({selectedFriends: selectedFriends, dataObjects: dataObjects})
  }

  selectVenue () {
    const event = this.props.event
    const selectedFriends = this.state.selectedFriends
    const dataObjects = this.state.dataObjects
    const profile = this.props.userProfile

    const invitees = []
  
    invitees.push(new Invitee(profile.id, profile.userLogin, profile.addressLongitude, profile.addressLatitude, 'member', profile.address, profile.imageUrl, 1))

    if(selectedFriends) {
      dataObjects.forEach(
        (value) => {
          if(value && selectedFriends.get(value.id)) {
            const imageUrl = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingImageUrl : value.friendRequestingImageUrl
            const id = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingId : value.friendRequestingId
            const login = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingLogin : value.friendRequestingLogin
            const address = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingAddress : value.friendRequestingAddress
            const addressLongitude = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingAddressLongitude : value.friendRequestingAddressLongitude
            const addressLatitude = value.friendRequestingId === this.props.userProfile.id ? value.friendAcceptingAddressLatitude : value.friendRequestingAddressLatitude
          
            invitees.push(new Invitee(id, login, addressLongitude, addressLatitude, 'member', address, imageUrl, 0))
          }
        }
      )
    }

    if(event && invitees) {
      NavigationActions.venueSelect({ event: this.props.event, invitees: invitees })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          onEndThreshold={100}
          ListHeaderComponent={this.renderHeader}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    friends: state.friends.friends,
    fetching: state.friends.fetchingAll,
    error: state.friends.errorAll,
    userProfile: state.userProfiles.currentUserProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(FriendActions.friendSearchRequest(query)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(FriendInviteScreen)