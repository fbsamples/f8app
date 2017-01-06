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

jest.dontMock('../schedule');
const schedule = require('../schedule');

describe('schedule reducer', () => {

  it('is empty by default', () => {
    expect(schedule(undefined, ({}: any))).toEqual({});
  });

  it('adds sessions to schedule', () => {
    expect(
      schedule({}, {type: 'SESSION_ADDED', id: 'one'})
    ).toEqual({one: true});

    expect(
      schedule({one: true}, {type: 'SESSION_ADDED', id: 'two'})
    ).toEqual({one: true, two: true});
  });

  it('removes sessions from schedule', () => {
    expect(
      schedule({
        one: true,
        two: true,
      }, {
        type: 'SESSION_REMOVED',
        id: 'two',
      })
    ).toEqual({
      one: true,
    });
  });

  it('restores schedule when logging in', () => {
    expect(
      schedule({
        one: true,
      }, {
        type: 'RESTORED_SCHEDULE',
        list: [{id: 'two'}, {id: 'three'}],
      })
    ).toEqual({
      two: true,
      three: true,
    });
  });

  it('clears schedule when logging out', () => {
    expect(
      schedule({
        one: true,
        two: true,
      }, {
        type: 'LOGGED_OUT',
      })
    ).toEqual({});
  });

});
