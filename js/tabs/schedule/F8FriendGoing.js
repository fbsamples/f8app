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
 * @providesModule F8FriendGoing
 * @flow
 */
'use strict';

var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');
var Image = require('Image');
var F8Touchable = require('F8Touchable');

import type {FriendsSchedule} from '../../reducers/friendsSchedules';

class F8FriendGoing extends React.Component {
  props: {
    onPress: () => void;
    friend: FriendsSchedule;
  };

  render() {
    return (
      <F8Touchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <ProfilePicture userID={this.props.friend.id} size={18} />
          <Text style={styles.name}>
            {this.props.friend.name}
          </Text>
          <Image source={require('../../common/img/disclosure.png')} />
        </View>
      </F8Touchable>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  name: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },
});

module.exports = F8FriendGoing;
