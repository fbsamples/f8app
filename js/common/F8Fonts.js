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

import { Platform, Dimensions } from "react-native";

const DEVICE_SCALE = Dimensions.get("window").width / 375;

const DEFAULT_FONT = "helvetica";
const SECONDARY_FONT = Platform.OS === "android" ? "basis" : "helvetica";

/* utils ==================================================================== */

// get font name and weight
function fontWithWeight(
  family: string = DEFAULT_FONT,
  weight: string = "regular"
): string {
  return family;
}

function normalize(size: number): number {
  return Math.round(DEVICE_SCALE * size);
}

// attempt to normalize x-platform line heights
function lineHeight(
  val: number = 1,
  scale: number = 1,
  normalized: boolean = true
): number {
  let adjusted = normalized ? normalize(val) : val;
  return Math.round(Platform.OS === "android" ? adjusted * scale : adjusted);
}

/* export =================================================================== */

export default {
  default: DEFAULT_FONT,
  helvetica: DEFAULT_FONT,
  basis: SECONDARY_FONT,
  h1: DEFAULT_FONT,
  h2: DEFAULT_FONT,
  h3: DEFAULT_FONT,
  h4: DEFAULT_FONT,
  p: DEFAULT_FONT,
  button: DEFAULT_FONT,

  fontWithWeight,
  lineHeight,
  normalize
};
