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

const React = require('react');

const {
  View,
  StyleSheet,
  ScrollView,
  ViewPagerAndroid,
  Platform,
} = require('react-native');

type Props = {
  count: number;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  bounces?: boolean;
  children?: any;
  style?: any;
};

type State = {
  width: number;
  height: number;
  selectedIndex: number;
  initialSelectedIndex: number;
  scrollingTo: ?number;
};

class ViewPager extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };
    (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
    (this: any).adjustCardSize = this.adjustCardSize.bind(this);
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIOS();
    } else {
      return this.renderAndroid();
    }
  }

  renderIOS() {
    return (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    );
  }

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref="scrollview"
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={styles.container}>
        {this.renderContent()}
      </ViewPagerAndroid>
    );
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        this.refs.scrollview.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        });
        this.setState({scrollingTo: nextProps.selectedIndex});
      } else {
        this.refs.scrollview.setPage(nextProps.selectedIndex);
        this.setState({selectedIndex: nextProps.selectedIndex});
      }
    }
  }

  renderContent(): Array<ReactElement> {
    var {width, height} = this.state;
    var style = Platform.OS === 'ios' && styles.card;
    return React.Children.map(this.props.children, (child, i) => (
      <View style={[style, {width, height}]} key={'r_' + i}>
        {child}
      </View>
    ));
  }

  handleHorizontalScroll(e: any) {
    var selectedIndex = e.nativeEvent.position;
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width,
      );
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }
    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return;
    }
    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({selectedIndex, scrollingTo: null});
      const {onSelectedIndexChange} = this.props;
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  }
});

module.exports = ViewPager;
