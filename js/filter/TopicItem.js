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

"use strict";

import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "../common/F8Text";
import F8Fonts from "../common/F8Fonts";
import * as TopicIcons from "./topicIcons";

/**
* ==============================================================================
* Filter screen list items
* ------------------------------------------------------------------------------
* @extends React.Component
* @param {string} topic The name of the topic
* @param {number} icon the year to match against
* @param {boolean} isChecked whether to show the default/active appearance
* @param {function} onToggle handler for tap event
* ==============================================================================
*/
export default class TopicItem extends React.Component {
  props: {
    topic: string,
    icon: number,
    isChecked: boolean,
    onToggle: (value: boolean) => void
  };

  render() {
    const { topic, icon, isChecked, onToggle } = this.props;

    const activeIcon = TopicIcons.get("active", icon);
    const defaultIcon = TopicIcons.get("default", icon);
    const accessibilityTraits = ["button"];
    if (isChecked) {
      accessibilityTraits.push("selected");
    }

    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={styles.container}
        onPress={onToggle}
      >
        <Image
          style={styles.icon}
          source={isChecked ? activeIcon : defaultIcon}
        />
        <Text style={styles.title}>{topic}</Text>
      </TouchableOpacity>
    );
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  container: {
    paddingVertical: 17,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "offWhite"),
    fontSize: 17,
    color: "white",
    flex: 1
  },
  icon: {
    marginRight: 18
  }
});
