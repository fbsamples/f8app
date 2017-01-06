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

import type {Action} from '../actions/types';

export type State = {
  [id: string]: boolean;
};

function schedule(state: State = {}, action: Action): State {
  switch (action.type) {
    case 'SESSION_ADDED':
      let added = {};
      added[action.id] = true;
      return {...state, ...added};

    case 'SESSION_REMOVED':
      let rest = {...state};
      delete rest[action.id];
      return rest;

    case 'LOGGED_OUT':
      return {};

    case 'RESTORED_SCHEDULE':
      let all = {};
      action.list.forEach((session) => {
        all[session.id] = true;
      });
      return all;
  }
  return state;
}

module.exports = schedule;
