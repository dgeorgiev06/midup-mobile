import React from 'react'
import { Text, TouchableOpacity, View, SectionList, Image } from 'react-native'
import { connect } from 'react-redux'
import FriendActions from '../Redux/FriendRedux'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line
import SearchBar from '../Components/SearchBar'
import { Card, CardItem, Button, Body, Left, Right } from 'native-base'
import { dataToSections } from '../Lib/DataModelUtils'
import { Colors } from '../Themes'
import PropTypes from 'prop-types'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/FriendEntityScreenStyle'

class FriendEntityScreen extends React.PureComponent {

  static propTypes = {
    sectionValues: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      loading: true,
      done: false,
      searchTerm: '',
      dataObjects: [],
      sections: [],
      updating: false,
      refreshing: false
    }
    
    this.renderRow = this.renderRow.bind(this)
  }

  renderSectionHeader({section}) {

    if(section.title === "accepted") {
      return null
    }

    return(
      <View style={{flex: .8, marginTop: 10, flexDirection: 'row', backgroundColor: Colors.backgroundColor}}>
        <Text style={{color: "#996375", fontWeight: 'normal', fontSize: 14}}>{section.title}:</Text>
      </View>  
    )
  }

  updateFriend(friend, status) {
    const updatedFriend = Object.assign({}, friend)
    updatedFriend.status = status
    this.setState({
      updating: true
    })
    this.props.updateFriend(updatedFriend)
  }

  renderButtons(item) {
    if(item.status === 'pending') {
      if(item.friendAcceptingId === this.props.userProfile.id) {
        return(
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'space-between'}}>
            <Button style={{padding: 15}} transparent onPress={() => this.updateFriend(item, 'accepted')}>
              <Text style={{color: '#505362'}}>Accept</Text>
            </Button>
            <Button style={{padding: 15}} transparent onPress={() => this.updateFriend(item, 'rejected')}>
              <Text style={{color: '#505362'}}>Reject</Text>
            </Button>
          </View>
        )
      }
    }
    else {
      return null
    }
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
    const id = item.friendRequestingId === this.props.userProfile.id ? item.friendAcceptingId : item.friendRequestingId

    return (
      <TouchableOpacity onPress={NavigationActions.userProfileEntityDetail.bind(this, { entityId: id })}>
        <Card transparent>
          <CardItem bordered>
            <Left>
              <Image borderRadius={10} style={styles.profileImage} source={profileImageUrl ? {uri: profileImageUrl} : defaultImage} />
              <Body>
                <Text>{login}</Text>
              </Body>
            </Left>
            <Right>
              {this.renderButtons(item)}
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

  fetchFriends = (reset) => {
    this.setState({refreshing: true})
    this.props.getAllFriends({ page: reset ? 0 : this.state.page, sort: this.state.sort, size: this.state.size })
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

    if(this.state.updating && !newProps.updating) {
      this.setState({
        updating: false
      })
      this.fetchFriends();
    }

    if (newProps.friends && !newProps.fetching) {
      const sections = dataToSections(newProps.friends, 'status', this.props.sectionValues, null)
      this.setState({
        refreshing: false,
        done: newProps.friends.length < this.state.size,
        loading: false,
        sections: this.state.loading ? [...this.state.sections, ...sections] : sections
      })
    }
  }

  componentWillMount () {
    this.fetchFriends()
  }

  refresh = () => {
    this.setState( {
      page: 0
    })

    this.fetchFriends(true)    
  }

  render () {
    return (
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={styles.listContent}
          sections={this.state.sections}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          onEndThreshold={1}
          onRefresh={this.refresh}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this.renderHeader}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          renderSectionHeader={this.renderSectionHeader}
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
    userProfile: state.userProfiles.currentUserProfile,
    updating: state.friends.updating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(FriendActions.friendSearchRequest(query)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    updateFriend: (friend) => dispatch(FriendActions.friendUpdateRequest(friend))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendEntityScreen)
