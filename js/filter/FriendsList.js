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

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

type Friend = {
  id: string;
  name: string;
};

class FriendsList extends React.Component {
  props: {
    friends: Array<Friend>;
    onPress: (friend: Friend) => void;
  };

  render() {
    if (this.props.friends.length === 0) {
      return (
        <View style={[styles.container, styles.noFriends]}>
          <Text style={styles.text}>
            No friends have shared their schedule.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.props.friends.map((friend) =>
          <UserPog
            user={friend}
            key={friend.id}
            onPress={() => this.props.onPress(friend)}
          />
        )}
      </View>
    );
  }
}

class UserPog extends React.Component {
  props: {
    user: Friend;
    onPress: () => void;
  };

  render() {
    var {id, name} = this.props.user;
    var firstName = name.split(' ')[0]; // TODO: problems with i18n
    return (
      <TouchableOpacity style={styles.pog} onPress={this.props.onPress}>
        <Image
          style={styles.profilePic}
          source={{uri: `http://graph.facebook.com/${id}/picture`}}
        />
        <Text style={styles.text}>
          {firstName}
        </Text>
      </TouchableOpacity>
    );
  }
}

const SIZE = 50;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFriends: {
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(3, 34, 80, 0.15)',
  },
  pog: {
    alignItems: 'center',
    margin: 6,
  },
  profilePic: {
    marginBottom: 6,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  }
});

module.exports = FriendsList;
