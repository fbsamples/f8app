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

import type {Action} from '../actions/types';

export type Tab =
    'schedule'
  | 'my-schedule'
  | 'map'
  | 'notifications'
  | 'info'
  ;

export type Day = 1 | 2;

type State = {
  tab: Tab;
  day: Day;
};

const initialState: State = {
  tab: 'schedule',
  day: 1,
  openModals: [
    {
      key: 'InitialRoute',
      type: 'MainTabs',
    },
    {
      key: 'InitialLoginRoute',
      type: 'InitialLogin',
    },
  ],
};
// require('AsyncStorage').clear();

function navigation(state: State = initialState, action: Action): State {

  if (action.type === 'LOGGED_IN') {
    const nonLoginModals = state.openModals.filter(modal =>
      modal.type !== 'InitialLogin' && modal.type !== 'LoginModal'
    );
    if (state.openModals.length !== nonLoginModals.length) {
      return {
        ...state,
        openModals: nonLoginModals,
      };
    }
  }

  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  if (action.type === 'BACK') {
    if (state.openModals.length <= 1) {
      return state;
    }
    return {
      ...state,
      openModals: state.openModals.slice(0, state.openModals.length - 1),
    };
  }
  if (action.type === 'OPEN_SESSION') {
    return {
      ...state,
      openModals: [
        ...state.openModals,
        {
          key: `Modal-${Date.now()}`,
          type: 'Session',
          session: action.session,
          day: action.day,
        },
      ],
    };
  }
  if (action.type === 'OPEN_FILTER') {
    return {
      ...state,
      openModals: [
        ...state.openModals,
        {
          key: `Modal-${Date.now()}`,
          type: 'Filter',
        },
      ],
    };
  }
  if (action.type === 'OPEN_SHARING_SETTINGS') {
    return {
      ...state,
      openModals: [
        ...state.openModals,
        {
          key: `Modal-${Date.now()}`,
          type: 'ShareSettings',
        },
      ],
    };
  }
  if (action.type === 'LOGGED_OUT') {
    const nonAuthModals = state.openModals.filter(modal =>
      modal.type !== 'ShareSettings'
    );
    if (state.openModals.length !== nonAuthModals.length) {
      return {
        ...state,
        openModals: nonAuthModals,
      };
    }
  }
  if (action.type === 'OPEN_LOGIN_MODAL') {
    return {
      ...state,
      openModals: [
        ...state.openModals,
        {
          key: `Modal-${Date.now()}`,
          type: 'LoginModal',
        },
      ],
    };
  }
  if (action.type === 'OPEN_SHARE') {
    return {
      ...state,
      openModals: [
        ...state.openModals,
        {
          key: `Modal-${Date.now()}`,
          type: 'Share',
        },
      ],
    };
  }
  if (action.type === 'SWITCH_DAY') {
    return {...state, day: action.day};
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
