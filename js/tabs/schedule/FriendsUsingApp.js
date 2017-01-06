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
 * @flow
 */
'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');

var { connect } = require('react-redux');

class FriendsUsingApp extends React.Component {
  props: {
    friends: Array<{id: string; name: string}>;
  };

  render() {
    const {friends} = this.props;
    if (friends.length === 0) {
      return null;
    }
    const pictures = friends.slice(0, 3).map((friend) => (
      <Image
        key={friend.id}
        source={{uri: `http://graph.facebook.com/${friend.id}/picture`}}
        style={styles.profilePic}
      />
    ));
    let text = `${friends.length} friends are sharing their schedules.`;
    if (friends.length === 1) {
      text = `${friends[0].name.split(' ')[0]} is sharing their schedule.`;
    }
    return (
      <View style={styles.container}>
        {pictures}
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 20,
    height: 20,
    marginRight: -3,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    marginLeft: 13,
    color: F8Colors.lightText,
  },
});

function select(store) {
  return {
    friends: store.friendsSchedules,
  };
}

module.exports = connect(select)(FriendsUsingApp);
