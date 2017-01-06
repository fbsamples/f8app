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
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Image = require('Image');

type Props = {
  numberOfSessions: number;
  onPress: () => void;
};

function RateSessionsCell({numberOfSessions, onPress}: Props) {
  const pluralSuffix = numberOfSessions === 1 ? '' : 's';
  return (
    <View style={styles.cell}>
      <Image
        style={styles.star}
        source={require('../../rating/img/full-star.png')}
      />
      <Text style={styles.text}>
        You have {numberOfSessions} session{pluralSuffix} to review
      </Text>

      <TouchableOpacity accessibilityTraits="button" onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.caption}>
            REVIEW
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

var styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginBottom: 2,
  },
  text: {
    fontSize: 15,
    color: F8Colors.darkText,
    flex: 1,
  },
  button: {
    backgroundColor: '#6F86D9',
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 12,
  },
});

module.exports = RateSessionsCell;
