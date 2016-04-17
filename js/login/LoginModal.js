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

var LoginButton = require('../common/LoginButton');
var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');
var F8Button = require('F8Button');

var { connect } = require('react-redux');
var { back } = require('../actions');

class LoginModal extends React.Component {
  props: {
    onLogin: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('./img/login-background.png')}>
          <Text style={styles.h1}>
            Log in with Facebook
          </Text>
          <Text style={styles.h2}>
            to save sessions to{'\n'}your schedule.
          </Text>
          <LoginButton onLoggedIn={() => this.loggedIn()} />
          <F8Button
            type="secondary"
            caption="Not Now"
            source="Modal"
            onPress={() => this.props.back()}
          />
        </Image>
      </View>
    );
  }

  loggedIn() {
    this.props.back();
    this.props.onLogin();
  }
}

const actions = (dispatch, props) => ({
  back: () => dispatch(back()),
});

LoginModal = connect(null, actions)(LoginModal);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    padding: 30,
    backgroundColor: 'transparent',
    borderRadius: 3,
    alignItems: 'center',
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: F8Colors.darkText,
    textAlign: 'center',
    marginTop: 130,
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    color: F8Colors.darkText,
    textAlign: 'center',
    marginBottom: 120,
  },
  notNowButton: {
    padding: 20,
  },
  notNowLabel: {
    color: F8Colors.lightText,
  }
});

module.exports = LoginModal;
