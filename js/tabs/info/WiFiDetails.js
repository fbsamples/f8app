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

var Clipboard = require('Clipboard');
var F8Button = require('F8Button');
var ToastAndroid = require('ToastAndroid');
var Platform = require('Platform');
var ItemsWithSeparator = require('../../common/ItemsWithSeparator');
var React = require('React');
var Section = require('./Section');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');
var F8Colors = require('F8Colors');

type Props = {
  network: string;
  password: string;
};

type State = {
  copied: boolean;
};

class WiFiDetails extends React.Component {
  props: Props;
  state: State = {
    copied: false,
  };

  render() {
    const caption = this.state.copied
      ? 'Copied!'
      : 'Copy password';
    return (
      <Section title="WiFi" style={styles.container}>
        <ItemsWithSeparator>
          <Row label="Network" value={this.props.network} />
          <Row label="Password" value={this.props.password} />
        </ItemsWithSeparator>
        <F8Button
          style={styles.button}
          onPress={this.handleCopy.bind(this)}
          caption={caption}
        />
      </Section>
    );
  }

  handleCopy() {
    Clipboard.setString(this.props.password);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied!', ToastAndroid.SHORT);
    } else {
      this.setState({copied: true});
      setTimeout(() => this.setState({copied: false}), 800);
    }
  }
}

class Row extends React.Component {
  props: {
    label: string;
    value: string;
  };

  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>
          {this.props.label.toUpperCase()}
        </Text>
        <Text style={styles.value}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: F8Colors.lightText,
  },
  value: {
    fontSize: 15,
    color: '#002350',
  },
  button: {
    marginTop: 25,
    marginHorizontal: 20,
  },
});
module.exports = WiFiDetails;
