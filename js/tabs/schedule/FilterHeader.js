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

var React = require('React');
var StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const Image = require('Image');

// TODO: Pull redux connection up
const {connect} = require('react-redux');
const {clearFilter} = require('../../actions');

class FilterHeader extends React.Component {
  render() {
    var topics = Object.keys(this.props.filter);
    if (topics.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {'Filters: '}
          <Text style={styles.filters}>
            {topics.join(', ')}
          </Text>
        </Text>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={this.props.onClearFilter}>
          <Image source={require('../../common/img/x-white.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12336B',
    paddingLeft: 16,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  clear: {
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  }
});

function select(store) {
  return {
    filter: store.filter,
  };
}

function actions(dispatch) {
  return {
    onClearFilter: () => dispatch(clearFilter()),
  };
}

module.exports = connect(select, actions)(FilterHeader);
