import React from 'react'
import PropTypes from 'prop-types'
import { Alert, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyles'
import { Metrics } from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import t from 'tcomb-form-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UserProfileActions from '../Redux/UserProfileRedux'

let Form = t.form.Form

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        login: t.String,
        password: t.String,
      }),
      accountValue: { login: null, password: null },
      options: {
        fields: {
          login: {
            label: 'Username',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.handlePressLogin()
          },
        }
      },
      visibleHeight: Metrics.screenHeight,
    }

    this.handlePressLogin = this.handlePressLogin.bind(this)
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Invalid login', [{text: 'OK'}])
        }
      } else if (newProps.account) {
        this.props.getUserProfile()
        NavigationActions.pop()
      }
    }
  }

  handlePressLogin = () => {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.attemptLogin(value.login, value.password)
    }
  }

  handlePressCancel = () => {
    this.props.logout()
    NavigationActions.pop()
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
            onChange={this.accountChange}
          />
          <View style={[styles.loginRow]}>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressCancel}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    logout: () => dispatch(LoginActions.logoutRequest()),
    getUserProfile: () => dispatch(UserProfileActions.userProfileCurrentRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
