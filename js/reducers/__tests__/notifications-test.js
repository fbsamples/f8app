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

const Parse = require('parse');

jest.dontMock('../notifications');
jest.dontMock('crc32');
const notifications = require('../notifications');

const emptyAction: any = {};
const empty = {server: [], push: [], enabled: null, registered: false, seen: {}};

describe('notifications reducer', () => {

  it('is empty by default', () => {
    expect(notifications(undefined, emptyAction)).toEqual(empty);
  });

  it('populates notifications from server', () => {
    let list = [
      new Parse.Object({text: 'hello', url: 'https://fbf8.com'}),
      new Parse.Object({text: 'bye', url: null}),
    ];

    let {server} = notifications(empty, {type: 'LOADED_NOTIFICATIONS', list});

    expect(server).toEqual([{
      id: jasmine.any(String),
      text: 'hello',
      url: 'https://fbf8.com',
      time: jasmine.any(Number),
    }, {
      id: jasmine.any(String),
      text: 'bye',
      url: null,
      time: jasmine.any(Number),
    }]);
  });

  it('skips duplicates', () => {
    const notification = {
      text: 'Hello, world!',
      url: null,
      time: 1234567,
    };

    const action1 = {
      type: 'RECEIVED_PUSH_NOTIFICATION',
      notification: {...notification},
    };
    const action2 = {
      type: 'RECEIVED_PUSH_NOTIFICATION',
      notification: {...notification},
    };

    const {push} = notifications(notifications(empty, action1), action2);
    expect(push).toEqual([{
      id: jasmine.any(String),
      ...notification
    }]);
  });

});
