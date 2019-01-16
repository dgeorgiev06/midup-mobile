import React from 'react'
import { FlatList, TouchableOpacity, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import EventActions from '../Redux/EventRedux'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line
import SearchBar from '../Components/SearchBar'
import Event from '../Components/Event'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/EventEntityScreenStyle'

class EventEntityScreen extends React.PureComponent {

  static onEnter () {
    NavigationActions.refresh({
      rightTitle: 'New Event',
      onRight: () => {
        NavigationActions.refs.eventList.getWrappedInstance().createEvent()
      }
    })
  }

  constructor (props) {
    super(props);

    this.state = {
      page: 0,
      sort: 'eventDate,asc',
      size: 20,
      loading: true,
      done: false,
      searchTerm: '',
      dataObjects: [],
      refreshing: false
    }
    
    this.editEvent = this.editEvent.bind(this)
  }

  createEvent = () => {
    NavigationActions.eventEntityEdit()
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
      <TouchableOpacity onPress={NavigationActions.eventEntityDetail.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Event name={item.eventName} date={item.eventDate} venue={item.venueName} address={item.address} image={item.imageUrl} organizer={item.eventOrganizerLogin}/>
        </View>
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
    <AlertMessage title='Life is short, have fun!!' show={!this.props.fetching} />

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
    this.fetchEvents()
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

  fetchEvents = (reset) => {
    this.setState({refreshing: true})
    this.props.getAllEvents({ page: reset ? 0 : this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchEvents()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.events) {
      this.setState({
        done: newProps.events.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.events] : newProps.events,
        loading: false,
        refreshing: false
      })
    }
    else if(newProps.error) {
      this.setState({refreshing: false})
      if(newProps.error !== 'CLIENT_ERROR') {
        Alert.alert(newProps.error, 'Cannot display events', [{text: 'OK'}])
      }
    }
  }

  editEvent () {
    NavigationActions.eventEntityEdit({ entityId: null })
  }

  async componentDidMount () {
    this.fetchEvents()
  }

  refreshEvents = () => {
    this.setState( {
      page: 0
    })

    this.fetchEvents(true)    
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
          onEndThreshold={1}
          onRefresh={this.refreshEvents}
          refreshing={this.state.refreshing}
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
    events: state.events.events,
    fetching: state.events.fetchingAll,
    error: state.events.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(EventActions.eventSearchRequest(query)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(EventEntityScreen)
