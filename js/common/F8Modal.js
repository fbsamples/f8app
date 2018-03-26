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
import { Modal, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

/* Constants
============================================================================= */

const MODAL_PADDING_H = 10,
  MODAL_BORDER_RADIUS = 4,
  FOOTER_GRADIENT_HEIGHT = 126;

/* <F8Modal />
============================================================================= */

class F8Modal extends React.Component {
  static defaultProps = {
    transparent: true,
    animationType: "fade"
  };

  render() {
    return (
      <Modal style={[styles.background, this.props.style]} {...this.props}>
        <View style={styles.container}>
          {this.props.bottomGradient && this.props.bottomGradient.length === 2
            ? this.renderBottomGradient()
            : null}
          {this.props.renderContent ? this.renderContent() : null}
          {this.props.renderFooter ? this.renderFooter() : null}
        </View>
      </Modal>
    );
  }

  renderContent() {
    return <View style={styles.card}>{this.props.renderContent()}</View>;
  }
  renderFooter() {
    return <View style={styles.footer}>{this.props.renderFooter()}</View>;
  }
  renderBottomGradient() {
    return (
      <LinearGradient
        pointerEvents="none"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
        colors={this.props.bottomGradient}
      />
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.colorWithAlpha("tangaroa", 0.8),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: MODAL_PADDING_H
  },
  card: {
    backgroundColor: F8Colors.white,
    borderRadius: MODAL_BORDER_RADIUS
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: FOOTER_GRADIENT_HEIGHT
  }
});

/* Exports
============================================================================= */
module.exports = F8Modal;
