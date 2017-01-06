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

var { createSelector } = require('reselect');

import type {Notification} from '../../reducers/notifications';

// Merges lists of notifications from server and notifications
// received via push and makes sure there is no duplicates.
function mergeAndSortByTime(server: Array<Notification>, push: Array<Notification>): Array<Notification> {
  var uniquePush = push.filter((pushNotification) => {
    var existsOnServer = server.find(
      (serverNotification) => serverNotification.text === pushNotification.text
    );
    return !existsOnServer;
  });

  var all = [].concat(server, uniquePush);
  return all.sort((a, b) => b.time - a.time);
}

module.exports = createSelector(
  (store) => store.notifications.server,
  (store) => store.notifications.push,
  mergeAndSortByTime
);
