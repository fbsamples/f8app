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
import F8Modal from "./F8Modal";
import F8Button from "./F8Button";
import F8Fonts from "./F8Fonts";
import { Platform, StyleSheet, View, Image, Alert } from "react-native";
import F8Linking from "./F8Linking";
import { Paragraph } from "./F8Text";

/* constants ================================================================ */

const APP_STORE = "https://itunes.apple.com/us/app/messenger/id454638411",
  PLAY_STORE =
    "https://play.google.com/store/apps/details?id=com.facebook.orca";

/* =============================================================================
<MessengerModal />
============================================================================= */

class MessengerModal extends React.Component {
  static __cards__;

  render() {
    return (
      <F8Modal
        renderContent={this.renderContent}
        renderFooter={this.renderFooter}
        bottomGradient={[
          F8Colors.colorWithAlpha("tangaroa", 0),
          F8Colors.colorWithAlpha("tangaroa", 1)
        ]}
        {...this.props}
      />
    );
  }

  renderContent = () => {
    return (
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("./img/messenger-app-icon.png")}
        />
        <Paragraph style={styles.text}>
          <Paragraph style={styles.boldText}>
            Install the Messenger app
          </Paragraph>{" "}
          to communicate with friends.
        </Paragraph>
        <F8Button
          caption="Go to the App Store"
          onPress={_ => this.openAppStore()}
        />
      </View>
    );
  };

  renderFooter = () => {
    return (
      <F8Button
        style={{ marginBottom: 27 }}
        theme="white"
        type="round"
        icon={require("./img/buttons/icon-x.png")}
        onPress={_ => this.props.dismiss && this.props.dismiss()}
      />
    );
  };

  openAppStore = () => {
    const url = Platform.OS === "ios" ? APP_STORE : PLAY_STORE;
    F8Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          this.props.dismiss && this.props.dismiss();
        } else {
          return F8Linking.openURL(url);
        }
      })
      .catch(() => {});
  };
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingVertical: 45,
    paddingHorizontal: 37
  },
  text: {
    marginVertical: 20,
    textAlign: "center"
  },
  boldText: {
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold")
  }
});

/* Playground Cards ========================================================= */

const messengerModal = MessengerModal;
messengerModal.__cards__ = define => {
  define("Default", () => (
    <MessengerModal visible={true} dismiss={_ => Alert.alert("Dismissed")} />
  ));
};

/* exports ================================================================== */
module.exports = messengerModal;
