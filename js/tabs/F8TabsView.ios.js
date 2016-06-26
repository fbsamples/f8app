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
 * @providesModule F8TabsView
 */

'use strict';

var F8Colors = require('F8Colors');
var StatusBarIOS = require('StatusBarIOS');
var F8InfoView = require('F8InfoView');
var F8MapView = require('F8MapView');
var F8NotificationsView = require('F8NotificationsView');
var GeneralScheduleView = require('./schedule/GeneralScheduleView');
var MyScheduleView = require('./schedule/MyScheduleView');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var Navigator = require('Navigator');
var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');

var { switchTab } = require('../actions');
var { connect } = require('react-redux');

import type {Tab, Day} from '../reducers/navigation';

class F8TabsView extends React.Component {
  props: {
    tab: Tab;
    day: Day;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
  };

  componentDidMount() {
    StatusBarIOS && StatusBarIOS.setStyle('light-content');
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    var scheduleIcon = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1.png')
      : require('./schedule/img/schedule-icon-2.png');
    var scheduleIconSelected = this.props.day === 1
      ? require('./schedule/img/schedule-icon-1-active.png')
      : require('./schedule/img/schedule-icon-2-active.png');
    return (
      <TabBarIOS tintColor={F8Colors.darkText}>
        <TabBarItemIOS
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={scheduleIcon}
          selectedIcon={scheduleIconSelected}>
          <GeneralScheduleView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="My F8"
          selected={this.props.tab === 'my-schedule'}
          onPress={this.onTabSelect.bind(this, 'my-schedule')}
          icon={require('./schedule/img/my-schedule-icon.png')}
          selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}>
          <MyScheduleView
            navigator={this.props.navigator}
            onJumpToSchedule={() => this.props.onTabSelect('schedule')}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Maps"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./maps/img/maps-icon.png')}
          selectedIcon={require('./maps/img/maps-icon-active.png')}>
          <F8MapView />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge || null}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}>
          <F8NotificationsView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Info"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}>
          <F8InfoView navigator={this.props.navigator} />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

function select(store) {
  return {
    tab: store.navigation.tab,
    day: store.navigation.day,
    notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(F8TabsView);
