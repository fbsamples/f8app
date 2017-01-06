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
var { Text } = require('F8Text');
var View = require('View');

class Section extends React.Component {
  render() {
    var {children, title} = this.props;
    if (React.Children.count(children) === 0) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
        {children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  title: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#A0B7FF',
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = Section;
