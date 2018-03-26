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

// Dependencies
// =============================================================================

import React from "react";
import ReactNative from "react-native";
import F8Colors from "./F8Colors";
import F8Fonts from "./F8Fonts";
import StyleSheet from "./F8StyleSheet";

// Text Elements
// =============================================================================

export function Text({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.text, style]} {...props} />;
}

export function Heading1({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h1, style]} {...props} />;
}

export function Heading2({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h2, style]} {...props} />;
}

export function Heading3({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h3, style]} {...props} />;
}

export function Heading4({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h4, style]} {...props} />;
}

export function Heading5({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h5, style]} {...props} />;
}

export function Paragraph({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.p, style]} {...props} />;
}

// export function Hyperlink({style, ...props}: Object): ReactElement<ReactNative.Text> {
//   return <ReactNative.Text style={[styles.a, style]} {...props} />;
// }

export function HeaderTitle({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.headerTitle, style]} {...props} />;
}

export function HorizontalRule({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.View style={[styles.hr, style]} {...props} />;
}

// Styles
// =============================================================================

const styles = StyleSheet.create({
  text: {
    fontFamily: F8Fonts.default
  },
  h1: {
    fontFamily: F8Fonts.h1,
    fontSize: F8Fonts.normalize(30),
    lineHeight: F8Fonts.lineHeight(37),
    color: F8Colors.blue
  },
  h2: {
    fontFamily: F8Fonts.h2,
    fontSize: F8Fonts.normalize(23),
    lineHeight: F8Fonts.lineHeight(27), //, 1.4
    color: F8Colors.tangaroa,
    letterSpacing: -0.24
  },
  h3: {
    fontFamily: F8Fonts.h3,
    fontSize: F8Fonts.normalize(17),
    lineHeight: F8Fonts.lineHeight(20),
    color: F8Colors.sapphire,
    letterSpacing: -0.11
  },
  h4: {
    fontFamily: F8Fonts.h4,
    fontSize: F8Fonts.normalize(13),
    lineHeight: F8Fonts.lineHeight(22),
    color: F8Colors.tangaroa
  },
  h5: {
    fontFamily: F8Fonts.helvetica,
    fontSize: F8Fonts.normalize(13),
    lineHeight: F8Fonts.lineHeight(22),
    color: F8Colors.tangaroa
  },
  p: {
    fontFamily: F8Fonts.p,
    fontSize: F8Fonts.normalize(17),
    lineHeight: F8Fonts.lineHeight(25), //, 1.25
    color: F8Colors.tangaroa
  },
  // a: {
  //   color: F8Colors.blue,
  //   textDecorationLine: 'underline',
  // },
  hr: {
    height: 1,
    backgroundColor: F8Colors.colorWithAlpha("black", 0.1)
  },
  headerTitle: {
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold"),
    ios: { fontSize: 17 },
    android: { fontSize: 20 }
  }
});
