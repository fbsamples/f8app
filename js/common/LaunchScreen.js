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
import F8Colors from "./F8Colors";
import { Dimensions, StyleSheet, View, Image } from "react-native";

const WIN_WIDTH = Dimensions.get("window").width,
  WIN_HEIGHT = Dimensions.get("window").height;

/**
* ==============================================================================
* <LaunchScreen />
* ------------------------------------------------------------------------------
* @return {ReactElement}
* ==============================================================================
*/

class LaunchScreen extends React.Component {
  static __cards__;

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={require("./img/launchscreen.png")}
          style={styles.image}
        />
      </View>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
    resizeMode: "cover"
  }
});

/* playground cards ========================================================= */

const launchScreen = LaunchScreen;
launchScreen.__cards__ = define => {
  define("Default", _ => <LaunchScreen />);
};

/* exports ================================================================== */
module.exports = launchScreen;
