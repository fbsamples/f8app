/**
 * Copyright 2017 Facebook, Inc.
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

const formatTime = require('./formatTime');

function naivePlural(text: string, count: number): string {
  if (count > 1) {
    return text + 's';
  }
  return text;
}

function formatDuration(startMs: number, endMs: number): string {
  let ms = endMs - startMs;
  let minutes = ms / 1000 / 60;
  let hours = Math.floor(minutes / 60);

  if (hours > 2) {
    return 'Until ' + formatTime(endMs).toLowerCase();
  }

  let durationText = '';
  if (hours > 0) {
    durationText = `${hours} ${naivePlural('hour', hours)} `;
    minutes = minutes - hours * 60;
  }

  if (minutes > 0) {
    durationText = `${durationText}${Math.ceil(minutes)} min`;
  }

  return durationText.trim();
}

module.exports = formatDuration;
