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
var F8SessionCell = require('F8SessionCell');
var React = require('React');
var StyleSheet = require('StyleSheet');
var findSessionByURI = require('findSessionByURI');
var { Text } = require('F8Text');
var TouchableHighlight = require('TouchableHighlight');
var View = require('View');
var moment = require('moment');

var { connect } = require('react-redux');

class NotificationCell extends React.Component {
  render() {
    var attachment;
    if (this.props.session) {
      attachment = (
        <F8SessionCell
          style={styles.session}
          session={this.props.session}
          showStartEndTime={true}
        />
      );
    } else if (this.props.notification.url) {
      attachment = <Text style={styles.url}>{this.props.notification.url}</Text>;
    }
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.cell, !this.props.isSeen && styles.unseen]}>
          <Text style={styles.text}>
            {this.props.notification.text}
          </Text>
          {attachment}
          <View style={styles.footer}>
            <Text style={styles.time}>
              {moment(this.props.notification.time).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  cell: {
    padding: 15,
    backgroundColor: 'white',
  },
  unseen: {
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4D99EF',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  session: {
    paddingVertical: undefined,
    paddingHorizontal: undefined,
    paddingLeft: undefined,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: F8Colors.cellBorder,
    // overflow: 'hidden',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#eee',
    shadowOpacity: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  url: {
    flex: 1,
    color: F8Colors.actionText,
    fontSize: 12,
    marginBottom: 10,
  },
  time: {
    color: F8Colors.lightText,
    fontSize: 12,
  },
});

function select(store, props) {
  return {
    session: findSessionByURI(store.sessions, props.notification.url),
    isSeen: store.notifications.seen[props.notification.id],
  };
}

module.exports = connect(select)(NotificationCell);
