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

var F8Button = require('F8Button');
var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Heading1, Paragraph } = require('F8Text');

class PushNUXModal extends React.Component {
  props: {
    onTurnOnNotifications: () => void;
    onSkipNotifications: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={require('./img/push-nux.png')}
          />
          <View style={styles.content}>
            <Heading1>
              Don't miss out!
            </Heading1>
            <Paragraph style={styles.text}>
              Turn on push notifications to see what’s happening at F8. You can
              always see in-app updates on this tab.
            </Paragraph>
            <F8Button
              style={styles.button}
              type="primary"
              caption="Turn on push notifications"
              onPress={this.props.onTurnOnNotifications}
            />
            <F8Button
              style={styles.button}
              type="secondary"
              caption="No thanks"
              onPress={this.props.onSkipNotifications}
            />
          </View>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 49,
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inner: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  image: {
    alignSelf: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
  },
  page: {
    borderTopWidth: 1,
    borderTopColor: F8Colors.cellBorder,
    paddingTop: undefined,
    paddingBottom: 0,
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch',
  },
});

module.exports = PushNUXModal;
