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

var React = require('react');
var {
  StyleSheet,
  View,
  TouchableOpacity,
} = require('react-native');
var { Text } = require('F8Text');

class TopicItem extends React.Component {
  props: {
    topic: string;
    color: string;
    isChecked: boolean;
    onToggle: (value: boolean) => void;
  };

  render() {
    const {topic, color, isChecked, onToggle} = this.props;
    const style = isChecked
      ? {backgroundColor: color}
      : {borderColor: color, borderWidth: 1};
    const accessibilityTraits = ['button'];
    if (isChecked) {
      accessibilityTraits.push('selected');
    }
    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={styles.container}
        onPress={onToggle}>
        <View style={[styles.checkbox, style]} />
        <Text style={styles.title}>
          {topic}
        </Text>
      </TouchableOpacity>
    );
  }
}

const SIZE = 24;

var styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: 'white',
    flex: 1,
  },
});

module.exports = TopicItem;
