/**
 * Copyright 2017 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Navigator
 * @flow
 */

'use strict';

var React = require('React');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var F8TabsView = require('F8TabsView');
var FriendsScheduleView = require('./tabs/schedule/FriendsScheduleView');
var FilterScreen = require('./filter/FilterScreen');
var LoginModal = require('./login/LoginModal');
var Navigator = require('Navigator');
var SessionsCarousel = require('./tabs/schedule/SessionsCarousel');
var SharingSettingsModal = require('./tabs/schedule/SharingSettingsModal');
var SharingSettingsScreen = require('./tabs/schedule/SharingSettingsScreen');
var ThirdPartyNotices = require('./tabs/info/ThirdPartyNotices');
var RatingScreen = require('./rating/RatingScreen');
var StyleSheet = require('StyleSheet');
var { connect } = require('react-redux');
var { switchTab } = require('./actions');

var F8Navigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  },

  render: function() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (route.shareSettings || route.friend) {
            return Navigator.SceneConfigs.FloatFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    if (route.allSessions) {
      return (
        <SessionsCarousel
          {...route}
          navigator={navigator}
        />
      );
    }
    if (route.session) {
      return (
        <SessionsCarousel
          session={route.session}
          navigator={navigator}
        />
      );
    }
    if (route.filter) {
      return (
        <FilterScreen navigator={navigator} />
      );
    }
    if (route.friend) {
      return (
        <FriendsScheduleView
          friend={route.friend}
          navigator={navigator}
        />
      );
    }
    if (route.login) {
      return (
        <LoginModal
          navigator={navigator}
          onLogin={route.callback}
        />
      );
    }
    if (route.share) {
      return (
        <SharingSettingsModal navigator={navigator} />
      );
    }
    if (route.shareSettings) {
      return <SharingSettingsScreen navigator={navigator} />;
    }
    if (route.rate) {
      return <RatingScreen navigator={navigator} surveys={route.surveys} />;
    }
    if (route.notices) {
      return <ThirdPartyNotices navigator={navigator} />;
    }
    return <F8TabsView navigator={navigator} />;
  },
});

F8Navigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(F8Navigator);
