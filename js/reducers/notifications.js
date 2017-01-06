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

var Platform = require('Platform');
var crc32 = require('crc32');

export type Notification = {
  id: string;
  url: ?string;
  text: string;
  time: number;
};

export type SeenNotifications = {
  [id: string]: boolean;
};

type State = {
  enabled: ?boolean; // null = no answer
  registered: boolean;

  // Most notifications will be stored on Parse Core, so that
  // people who installed the app after the conference started can
  // get access. But some notifications will be delivered
  // via push and only to subset of attendees.
  server: Array<Notification>;
  push: Array<Notification>;

  seen: SeenNotifications;
};

const initialState = {
  server: [],
  push: [],
  enabled: Platform.OS === 'ios' ? null : true,
  registered: false,
  seen: {},
};

import type {Action} from '../actions/types';

function notifications(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LOADED_NOTIFICATIONS':
      let list = action.list.map(fromParseObject);
      return {...state, server: list};

    case 'RECEIVED_PUSH_NOTIFICATION':
      return {...state, push: append(action.notification, state.push)};

    case 'LOGGED_OUT':
      return {...state, push: []};

    case 'TURNED_ON_PUSH_NOTIFICATIONS':
      return {...state, enabled: true};

    case 'SKIPPED_PUSH_NOTIFICATIONS':
      return {...state, enabled: false};

    case 'REGISTERED_PUSH_NOTIFICATIONS':
      return {...state, registered: true};

    case 'RESET_NUXES':
      return {...state, enabled: initialState.enabled};

    case 'SEEN_ALL_NOTIFICATIONS':
      return {...state, seen: fetchAllIds([...state.server, ...state.push])};

    default:
      return state;
  }
}

function append(notification, list) {
  const id = notification.id || crc32(notification.text + notification.url).toString(36);
  if (list.find((n) => n.id === id)) {
    return list;
  }
  return [{id, ...notification}, ...list];
}

function fetchAllIds(notifs: Array<Notification>): SeenNotifications {
  const seen = {};
  notifs.forEach((notification) => {
    seen[notification.id] = true;
  });
  return seen;
}

function fromParseObject(object: Object): Notification {
  return {
    id: object.id,
    text: object.get('text'),
    url: object.get('url'),
    time: object.createdAt.getTime(),
  };
}

module.exports = notifications;
