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
 * @flow
 */
'use strict';

var F8Colors = require('F8Colors');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var FriendsUsingApp = require('./FriendsUsingApp');
var Navigator = require('Navigator');
var Switch = require('Switch');
var View = require('View');
var F8Header = require('F8Header');
var StatusBar = require('StatusBar');
var SharingSettingsCommon = require('./SharingSettingsCommon');

var { back, setSharingEnabled, logOutWithPrompt } = require('../../actions');
var { connect } = require('react-redux');

import type {State as User} from '../../reducers/user';

class SharingSettingsScreen extends React.Component {
  props: {
    navigator: Navigator;
    dispatch: () => void;
    sharedSchedule: boolean;
    user: User;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="default"
         />
        <SharingSettingsCommon />
        <View style={styles.switchWrapper}>
          <Text style={styles.option}>
            NO
          </Text>
          <Switch
            accessibilityLabel="Let friends view your schedule"
            style={styles.switch}
            value={!!this.props.sharedSchedule}
            onValueChange={(enabled) => this.props.dispatch(setSharingEnabled(enabled))}
            onTintColor="#00E3AD"
          />
          <Text style={styles.option}>
            YES
          </Text>
        </View>
        <FriendsUsingApp />
        <F8Header
          style={styles.header}
          foreground="dark"
          title="Settings"
          leftItem={{
            icon: require('../../common/img/back.png'),
            title: 'Back',
            layout: 'icon',
            onPress: () => this.props.dispatch(back()),
          }}
          rightItem={{
            icon: require('./img/logout.png'),
            title: 'Logout',
            onPress: () => this.props.dispatch(logOutWithPrompt()),
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 49,
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    margin: 10,
  },
  option: {
    fontSize: 12,
    color: F8Colors.lightText,
  },
});

function select(store) {
  return {
    user: store.user,
    sharedSchedule: store.user.sharedSchedule,
  };
}

module.exports = connect(select)(SharingSettingsScreen);
