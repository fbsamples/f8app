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
 *
 * @flow
 */

'use strict';

import type { Action } from './types';
import type { Session } from '../reducers/sessions';

type Tab = 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info';

module.exports = {
  back: (): Action => ({
    type: 'BACK',
  }),

  openFilter: (): Action => ({
    type: 'OPEN_FILTER',
  }),

  openNavDrawer: (): Action => ({
    type: 'OPEN_NAV_DRAWER',
  }),

  openFriend: (friend: string): Action => ({
    type: 'OPEN_FRIEND',
    friend,
  }),

  openSharingSettings: (): Action => ({
    type: 'OPEN_SHARING_SETTINGS',
  }),

  openLoginModal: (): Action => ({
    type: 'OPEN_LOGIN_MODAL',
  }),

  openShare: (): Action => ({
    type: 'OPEN_SHARE',
  }),

  openSession: (session: string, day: 1 | 2): Action => ({
    type: 'OPEN_SESSION',
    day,
    session,
  }),

  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),

  switchDay: (day: 1 | 2): Action => ({
    type: 'SWITCH_DAY',
    day,
  }),
};
