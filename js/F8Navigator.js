/**
 * Copyright 2016 Facebook, Inc.
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
var F8NavigationCard = require('./F8NavigationCard');
var FriendsScheduleView = require('./tabs/schedule/FriendsScheduleView');
var FilterScreen = require('./filter/FilterScreen');
var LoginModal = require('./login/LoginModal');
var LoginScreen = require('./login/LoginScreen');
var SessionsCarousel = require('./tabs/schedule/SessionsCarousel');
var SharingSettingsModal = require('./tabs/schedule/SharingSettingsModal');
var SharingSettingsScreen = require('./tabs/schedule/SharingSettingsScreen');
var ThirdPartyNotices = require('./tabs/info/ThirdPartyNotices');
var RatingScreen = require('./rating/RatingScreen');
var StyleSheet = require('StyleSheet');
var NavigationExperimental = require('NavigationExperimental');
var { connect } = require('react-redux');
var { back, switchTab } = require('./actions');

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

    if (true) { // todo: cjeck of we ca ngo back
      this.props.dispatch(back());
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  },

  // render: function() {
  //   return (
  //     <Navigator
  //       ref="navigator"
  //       style={styles.container}
  //       configureScene={(route) => {
  //         if (Platform.OS === 'android') {
  //           return Navigator.SceneConfigs.FloatFromBottomAndroid;
  //         }
  //         // TODO: Proper scene support
  //         if (route.shareSettings || route.friend) {
  //           return Navigator.SceneConfigs.FloatFromRight;
  //         } else {
  //           return Navigator.SceneConfigs.FloatFromBottom;
  //         }
  //       }}
  //       initialRoute={{}}
  //       renderScene={this.renderScene}
  //     />
  //   );
  // },

  render: function() {
    console.log('bah', this.props.openModals)
    return (
      <NavigationExperimental.AnimatedView
        style={styles.container}
        renderScene={this.renderScene}
        onNavigate={(action) => {
          if (action.type === 'back') {
            this.props.dispatch(back());
          }
        }}
        navigationState={{
          key: 'F8NavigatorState',
          index: this.props.openModals.length - 1,
          children: this.props.openModals,
        }}
      />
    );
  },

  renderScene: function(props) {
    const sceneState = props.scene.navigationState;
    let isVertical = true;
    if (sceneState.type === 'ShareSettings') {
      isVertical = false;
    }
    return (
      <F8NavigationCard
        isVertical={isVertical}
        renderScene={this.renderInnerScene}
        {...props}>
        {this.renderInnerScene(props)}
      </F8NavigationCard>
    );
  },

  renderInnerScene: function(props) {
    const sceneState = props.scene.navigationState;
    // if (route.allSessions) {
    //   return (
    //     <SessionsCarousel
    //       {...route}
    //     />
    //   );
    // }
    console.log('renderign scene', sceneState);
    if (sceneState.type === 'Session') {
      return (
        <SessionsCarousel
          session={sceneState.session}
        />
      );
    }
    if (sceneState.type === 'Filter') {
      return (
        <FilterScreen />
      );
    }
    // if (route.friend) {
    //   return (
    //     <FriendsScheduleView
    //       friend={route.friend}
    //     />
    //   );
    // }
    // if (sceneState.type === 'InitialLogin') {
    //   return (
    //     <LoginScreen />
    //   );
    // }
    if (sceneState.type === 'LoginModal') {
      return (
        <LoginModal
          onLogin={() => {}}
        />
      );
    }
    if (sceneState.type === 'Share') {
      return (
        <SharingSettingsModal />
      );
    }
    if (sceneState.type === 'ShareSettings') {
      return <SharingSettingsScreen />;
    }
    // if (route.rate) {
    //   return <RatingScreen surveys={route.surveys} />;
    // }
    // if (route.notices) {
    //   return <ThirdPartyNotices />;
    // }
    return <F8TabsView />;
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
    openModals: store.navigation.openModals,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(F8Navigator);
