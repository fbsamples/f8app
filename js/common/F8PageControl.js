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
 * @providesModule F8PageControl
 * @flow
 */
'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');

var PropTypes = React.PropTypes;

var F8PageControl = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    count: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  },

  render: function() {
    var images = [];
    for (var i = 0; i < this.props.count; i++) {
      var isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.innerContainer}>
          {images}
        </View>
      </View>
    );
  }
});

var Circle = React.createClass({
  render: function() {
    var extraStyle = this.props.isSelected ? styles.full : styles.empty;
    return <View style={[styles.circle, extraStyle]} />;
  }
});

var CIRCLE_SIZE = 4;

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

module.exports = F8PageControl;
module.exports.__cards__ = (define) => {
  define('Simple 2', () => <F8PageControl count={2} selectedIndex={0} />);
  define('Simple 5', () => <F8PageControl count={5} selectedIndex={2} />);
};
