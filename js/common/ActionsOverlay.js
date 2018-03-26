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
 * @flow
 */

"use strict";

import React from "react";
import { View, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import StyleSheet from "./F8StyleSheet";
import F8Colors from "./F8Colors";
import F8Button from "./F8Button";

/* config =================================================================== */

const CONTAINER_HEIGHT = 126,
  BUTTON_PADDING_H = 17,
  BUTTON_PADDING_B = 27;

/* =============================================================================
<ActionsOverlay />
============================================================================= */
class ActionsOverlay extends React.Component {
  static __cards__;
  static height = CONTAINER_HEIGHT;
  static defaultProps = {
    buttonContainerStyles: {
      paddingHorizontal: BUTTON_PADDING_H,
      paddingBottom: BUTTON_PADDING_B
    },
    gradientColors: [F8Colors.colorWithAlpha("tangaroa", 0), F8Colors.tangaroa],
    gradientStart: { x: 0.5, y: 0 },
    gradientEnd: { x: 0.5, y: 1 }
  };

  render() {
    const {
      children,
      gradientColors,
      gradientStart,
      gradientEnd,
      buttonContainerStyles
    } = this.props;

    return (
      <View
        style={[styles.container, this.props.style]}
        pointerEvents="box-none"
      >
        <LinearGradient
          pointerEvents="none"
          start={gradientStart}
          end={gradientEnd}
          style={styles.gradient}
          colors={gradientColors}
        />
        <View
          pointerEvents="box-none"
          style={[styles.buttonContainer, buttonContainerStyles]}
        >
          {children}
        </View>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    height: CONTAINER_HEIGHT,
    // flex:1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonContainer: {
    flexDirection: "row"
  }
});

/* Playground Cards
============================================================================= */
const actionsOverlay = ActionsOverlay;
actionsOverlay.__cards__ = define => {
  define("Default", () => (
    <ActionsOverlay>
      <F8Button
        theme="white"
        type="round"
        icon={require("./img/buttons/icon-x.png")}
        onPress={_ => Alert.alert("round (white) pressed!")}
      />
      <F8Button
        theme="blue"
        type="round"
        style={{ marginLeft: 9 }}
        icon={require("./img/buttons/icon-check.png")}
        onPress={_ => Alert.alert("round (blue) pressed!")}
      />
    </ActionsOverlay>
  ));

  define("Session Details", () => (
    <ActionsOverlay>
      <F8Button
        style={{ flex: 1 }}
        caption="Add to my F8"
        icon={require("./img/buttons/logo-fb.png")}
        onPress={_ => Alert.alert("button pressed!")}
      />
      <F8Button
        type="round"
        style={{ marginLeft: 9 }}
        icon={require("./img/buttons/icon-check.png")}
        onPress={_ => Alert.alert("round (blue) pressed!")}
      />
    </ActionsOverlay>
  ));
};

/* Export
============================================================================= */
module.exports = actionsOverlay;
