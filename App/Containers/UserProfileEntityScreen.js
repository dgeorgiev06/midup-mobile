import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import UserProfileActions from '../Redux/UserProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line
import SearchBar from '../Components/SearchBar'
import { Card, CardItem, Thumbnail, Body, Left } from 'native-base'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/UserProfileEntityScreenStyle'

const defaultImage = require('../Images/avatar.png')

class UserProfileEntityScreen extends React.PureComponent {

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    page: 0,
    sort: 'id,asc',
    size: 20,
    loading: true,
    done: false,
    searchTerm: '',
    dataObjects: []
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
      <TouchableOpacity onPress={NavigationActions.userProfileEntityDetail.bind(this, { entityId: item.id })}>
        <Card transparent>
          <CardItem bordered>
            <Left>
              <Thumbnail square source={item.imageUrl ? {uri: item.imageUrl} : defaultImage } />
              <Body>
                <Text>{item.userLogin}</Text>
              </Body>
            </Left>
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
    <AlertMessage title='No UserProfiles Found' show={!this.props.fetching} />

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
    if (newProps.userProfiles) {
      this.setState({
        done: newProps.userProfiles.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.userProfiles] : newProps.userProfiles,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchUserProfiles()
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
    userProfiles: state.userProfiles.userProfilesSansFriends,
    fetching: state.userProfiles.fetchingAll,
    error: state.userProfiles.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(UserProfileActions.userProfileSearchRequest(query)),
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileSansFriendsRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEntityScreen)
