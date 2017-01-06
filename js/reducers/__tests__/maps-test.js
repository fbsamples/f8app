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

jest.autoMockOff();

const Parse = require('parse');
const maps = require('../maps');

describe('maps reducer', () => {

  it('is empty by default', () => {
    expect(maps(undefined, {})).toEqual([]);
  });

  it('populates maps from server', () => {
    let list = [
      new Parse.Object({
        name: 'Day 1',
        x1: new Parse.File('x1.png'),
        x2: new Parse.File('x2.png'),
        x3: new Parse.File('x3.png'),
      }),
    ];

    expect(
      maps([], {type: 'LOADED_MAPS', list})
    ).toEqual([{
      id: jasmine.any(String),
      name: 'Day 1',
      x1url: 'x1.png',
      x2url: 'x2.png',
      x3url: 'x3.png',
    }]);
  });

});
