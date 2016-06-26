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

var Image = require('Image');
import LinearGradient from 'react-native-linear-gradient';
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Animated = require('Animated');

type Props = {
  isAdded: boolean;
  onPress: () => void;
  addedImageSource?: ?number;
  style?: any;
};

type State = {
  anim: Animated.Value;
};

const SAVED_LABEL = 'Saved to your schedule';
const ADD_LABEL = 'Add to my schedule';

class AddToScheduleButton extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      anim: new Animated.Value(props.isAdded ? 1 : 0),
    };
  }

  render() {
    const colors = this.props.isAdded ? ['#4DC7A4', '#66D37A'] : ['#6A6AD5', '#6F86D9'];

    const addOpacity = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 40],
        }),
      }],
    };

    const addOpacityImage = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
      }],
    };

    const addedOpacity = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0],
        }),
      }],
    };

    const addedOpacityImage = {
      opacity: this.state.anim.interpolate({
        inputRange: [0.7, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-80, 0],
        }),
      }],
    };

    return (
      <TouchableOpacity
        accessibilityLabel={this.props.isAdded ? SAVED_LABEL : ADD_LABEL}
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.9}
        style={[styles.container, this.props.style]}>
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={colors}
          collapsable={false}
          style={styles.button}>
          <View style={{flex: 1}}>
            <View style={styles.content} collapsable={false}>
              <Animated.Image
                source={this.props.addedImageSource || require('./img/added.png')}
                style={[styles.icon, addedOpacityImage]}
              />
              <Animated.Text style={[styles.caption, addedOpacity]}>
                <Text>{SAVED_LABEL.toUpperCase()}</Text>
              </Animated.Text>
            </View>
            <View style={styles.content}>
              <Animated.Image
                source={require('./img/add.png')}
                style={[styles.icon, addOpacityImage]}
              />
              <Animated.Text style={[styles.caption, addOpacity]}>
                <Text>{ADD_LABEL.toUpperCase()}</Text>
              </Animated.Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.isAdded !== nextProps.isAdded) {
      const toValue = nextProps.isAdded ? 1 : 0;
      Animated.spring(this.state.anim, {toValue}).start();
    }
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HEIGHT,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

module.exports = AddToScheduleButton;
// $FlowFixMe
module.exports.__cards__ = (define) => {
  let f;
  setInterval(() => f && f(), 1000);

  define('Inactive', (state = true, update) =>
    <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

  define('Active', (state = false, update) =>
    <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

  define('Animated', (state = false, update) => {
    f = () => update(!state);
    return <AddToScheduleButton isAdded={state} onPress={() => {}} />;
  });
};
