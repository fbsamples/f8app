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
 * @providesModule F8SessionCell
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var F8Touchable = require('F8Touchable');
var View = require('View');
var formatDuration = require('./formatDuration');
var formatTime = require('./formatTime');

var { connect } = require('react-redux');

import type {Session} from '../../reducers/sessions';

class F8SessionCell extends React.Component {
  props: {
    session: Session;
    showTick: boolean;
    showStartEndTime: boolean;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var session = this.props.session;
    var tick;
    if (this.props.showTick) {
      tick =
        <Image style={styles.added} source={require('./img/added-cell.png')} />;
    }
    var time;
    if (this.props.showStartEndTime) {
      time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
    } else {
      time = formatDuration(session.startTime, session.endTime);
    }
    var location = session.location && session.location.toUpperCase();
    var locationColor = F8Colors.colorForLocation(location);
    var cell =
      <View style={[styles.cell, this.props.style]}>
        <View style={styles.titleSection}>
          <Text numberOfLines={2} style={styles.titleText}>
            {session.title}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.duration}>
          <Text style={[styles.locationText, {color: locationColor}]}>
            {location}
          </Text>
          {location && ' - '}
          {time}
        </Text>
        {tick}
      </View>;

    if (this.props.onPress) {
      cell =
        <F8Touchable onPress={this.props.onPress}>
          {cell}
        </F8Touchable>;
    }

    return cell;
  }
}


var styles = StyleSheet.create({
  cell: {
    paddingVertical: 15,
    paddingLeft: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: F8Colors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: F8Colors.lightText,
  },
  locationText: {
    fontSize: 12,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});

function select(store, props) {
  return {
    showTick: !!store.schedule[props.session.id],
  };
}

module.exports = connect(select)(F8SessionCell);
