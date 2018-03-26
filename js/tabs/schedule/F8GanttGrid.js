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

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../common/F8Text";
import { timezone } from "../../env.js";

/* constants ================================================================ */
const LABELS_WIDTH = 30,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8GanttGrid />
============================================================================= */

export default class F8GanttGrid extends React.Component {
  render() {
    const ms = moment.tz(this.props.startTime, timezone),
      me = moment.tz(this.props.endTime, timezone);
    const diff = me.diff(ms, "hours");
    const cols = this.renderColumns(ms, diff);
    return (
      <View style={[styles.gridContainer, { height: this.props.height }]}>
        {cols}
      </View>
    );
  }

  renderColumns(momentStart: moment, count: number) {
    let cols = [];
    let previousLabelAMPM = null;
    for (let i = 0; i < count + 1; i++) {
      const left = this.props.containerWidth / count * i - LABELS_WIDTH / 2;
      let label = null;
      if (i % 2 === 0) {
        let labelText = momentStart.add(i, "h").format("h");
        let ampm = momentStart
          .format("A")
          .split("M")
          .join("");
        if (previousLabelAMPM && ampm !== previousLabelAMPM) {
          labelText += momentStart
            .format("A")
            .split("M")
            .join("");
        }
        // if(ampm !== previousLabelAMPM) labelText += (momentStart.format('A')).split('M').join('');
        previousLabelAMPM = momentStart
          .format("A")
          .split("M")
          .join("");
        label = <Text style={styles.gridColumnLabel}>{labelText}</Text>;
        momentStart.subtract(i, "h");
      }
      cols.push(
        <View key={i} style={[styles.gridColumn, { left }]}>
          <View style={styles.gridLine} />
          {label}
        </View>
      );
    }
    return cols;
  }
}

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  gridContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  gridColumn: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: LABELS_WIDTH,
    backgroundColor: "transparent" //'#2d3132',
    // alignItems: 'center',
  },
  gridLine: {
    position: "absolute",
    left: LABELS_WIDTH / 2,
    top: 0,
    bottom: LABELS_HEIGHT,
    width: 1,
    backgroundColor: "rgba(22, 51, 96, 1)"
  },
  gridColumnLabel: {
    position: "absolute",
    paddingTop: 6,
    left: 0,
    right: 0,
    height: LABELS_HEIGHT,
    bottom: 0, //-LABELS_HEIGHT,
    textAlign: "center",
    fontSize: 10,
    color: "rgba(95, 118, 162, 1)",
    backgroundColor: "transparent"
  }
});
