import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import UserProfileActions from '../Redux/UserProfileRedux'
import FriendActions from '../Redux/FriendRedux'
import SearchBar from '../Components/SearchBar'
import { Card, CardItem, Thumbnail, Body, Left, Right, CheckBox, Footer } from 'native-base'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/FriendRequestScreenStyle'

const defaultImage = require('../Images/avatar.png')

class FriendRequestScreen extends React.PureComponent {

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
      selectedFriends: new Map(),
      requestingUpdate: false
    }

    this.renderRow = this.renderRow.bind(this)
    this.requestFriends = this.requestFriends.bind(this)
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
    return (
      <TouchableOpacity onPress={() => this.profileSelected(item)}>
        <Card transparent>
          <CardItem bordered>
            <Left>
              <Image borderRadius={10} style={styles.profileImage} source={item.imageUrl ? {uri: item.imageUrl} : defaultImage } />
              <Body>
                <Text>{item.userLogin}</Text>
              </Body>
            </Left>
            
            <Right>
              <CheckBox color='orange'  checked={this.state.selectedFriends.get(item.id)}/>
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
    <AlertMessage title='Everyone is your friend!!' show={!this.props.fetching} />

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
    this.fetchUserProfiles()
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
  
  fetchUserProfiles = () => {
    this.setState({
      loading: true
    })
    this.props.getAllUserProfiles({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchUserProfiles()
  }

  componentWillReceiveProps (newProps) {

    if(this.state.requestingFriends && newProps.requestingFriends) {
      if(newProps.errorRequestingFriends) {
        Alert.alert('Error', 'Something went wrong processing friend request', [{text: 'OK'}])
        this.setState({
          requestingFriends: false,
        })
      }
      else {
        this.setState({
          page: 0,
          sort: 'id,asc',
          size: 20,
          dataObjects: [],
          selectedFriends: new Map(),
        })
        this.fetchUserProfiles()
      }
     }

    if (this.state.loading && !newProps.fetching) {
      if(newProps.errorFetching) {
        Alert.alert('Error', 'Something went wrong fetching profiles', [{text: 'OK'}])
        this.setState({
          loading: false,
        })
      }
      else {
        const dataObjects = this.state.loading ? [...this.state.dataObjects, ...newProps.userProfiles] : newProps.userProfiles
        const selectedFriends = this.state.selectedFriends
        dataObjects.forEach(element => {
            if(!selectedFriends.get([element.id])) {
                selectedFriends.set(element.id, false)
            }
        })

        this.setState({
          done: newProps.userProfiles.length < this.state.size,
          dataObjects: dataObjects,
          loading: false,
          selectedFriends: selectedFriends
        })
      }
    }
  }

  componentWillMount () {
    this.fetchUserProfiles()
  }

  valuesToEntity = (key) => {
    return {
      friendRequestingId: this.props.userProfile.id,
      friendAcceptingId: key
    }
  }

  profileSelected = (item) => {
    let selectedFriends = this.state.selectedFriends
    selectedFriends.set(item.id, !selectedFriends.get(item.id))
    let dataObjects = this.state.dataObjects.slice(0) //need to change referrence in order for list to update
    this.setState({selectedFriends: selectedFriends, dataObjects: dataObjects})
  }

  requestFriends() {
    const selectedFriends = this.state.selectedFriends
    Alert.alert(
      '',
      'Confirm friend(s) request',
      [
        {text: 'OK', onPress: () => {
            console.tron.log('OK Pressed')
            let friendRequests = []
            if(selectedFriends) {
              selectedFriends.forEach(
                (value, key, map) => {
                  if(value) {
                    friendRequests.push(this.valuesToEntity(key))
                  }
                }
              )
            }
            if(friendRequests.length) {
              this.setState({
                requestingFriends: true
              })
              this.props.friendsRequest(friendRequests)
            }
          }
        },
        {text: 'Cancel', onPress: () => console.tron.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
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
        <Footer>
          <TouchableOpacity transparent onPress={this.requestFriends}>
            <Text style={styles.requestText}>Request</Text>
          </TouchableOpacity>
        </Footer>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    // ...redux state to props here
    userProfiles: state.userProfiles.userProfilesSansFriends,
    fetching: state.userProfiles.fetchingSansFriends,
    errorFetching: state.userProfiles.errorSansFriends,
    userProfile: state.userProfiles.currentUserProfile,
    errorRequestingFriends: state.friends.errorNew,
    requestingFriends: state.friends.fetchingNew
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(UserProfileActions.userProfileSearchRequest(query)),
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileSansFriendsRequest(options)),
    friendsRequest: (friends) => dispatch(FriendActions.friendNewRequest(friends))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestScreen)