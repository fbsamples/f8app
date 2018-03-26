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
 */
"use strict";

import React from "react";
import F8Analytics from "../../F8Analytics";
import { View } from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import F8DemoDetails from "./F8DemoDetails";
import F8Header from "../../common/F8Header";
import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";
import StyleSheet from "../../common/F8StyleSheet";
import Carousel from "../../common/Carousel";
import { HeaderTitle } from "../../common/F8Text";
import F8PageControl from "../../common/F8PageControl";

import { connect } from "react-redux";

type Props = {
  allDemos: Array<mixed>,
  navigator: Navigator
};

class DemosCarousel extends React.Component {
  props: Props;
  state: {
    selectedIndex: number
  };

  static defaultProps = {
    title: "Demos"
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex
    };

    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
  }

  render() {
    const backItem = {
      title: "Back",
      layout: "icon",
      icon: require("../../common/img/header/back.png"),
      onPress: () => this.props.navigator.pop()
    };

    return (
      <View style={styles.container}>
        <F8Header
          backgroundColor={F8Colors.turquoise}
          titleColor={F8Colors.sapphire}
          navItem={backItem}
        >
          <View style={styles.headerContent}>
            <HeaderTitle>{this.props.title}</HeaderTitle>
            <F8PageControl
              count={this.props.allDemos.length}
              selectedIndex={this.state.selectedIndex}
            />
          </View>
        </F8Header>
        <Carousel
          count={this.props.allDemos.length}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    return (
      <F8DemoDetails
        navigator={this.props.navigator}
        demo={this.props.allDemos[index]}
      />
    );
  }

  componentDidMount() {
    this.track(this.state.selectedIndex);
  }

  handleIndexChange(selectedIndex: number) {
    this.track(selectedIndex);
    this.setState({ selectedIndex });
  }

  track(index: number) {
    const { id } = this.props.allDemos[index];
    F8Analytics.logEvent("View Demo", 1, { id });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center"
    },
    ios: {
      alignItems: "center",
      justifyContent: "center"
    }
  },
  day: {
    color: F8Colors.yellow,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helveticaBold"),
    fontSize: 13
  },
  time: {
    color: F8Colors.white,
    fontFamily: F8Fonts.helvetica,
    fontSize: 15
  }
});

module.exports = connect()(DemosCarousel);
