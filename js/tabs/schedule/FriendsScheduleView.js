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

var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var EmptySchedule = require('./EmptySchedule');
var FilterSessions = require('./filterSessions');
var ListContainer = require('ListContainer');
var ScheduleListView = require('./ScheduleListView');

var { connect } = require('react-redux');
import {back} from '../../actions/';

import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';

var { createSelector } = require('reselect');

type Props = {
  back: Function;
  sessions: Array<Session>;
  friend: FriendsSchedule;
};

class FriendsScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.renderEmptyList = this.renderEmptyList.bind(this);
  }

  render() {
    const backItem = {
      icon: require('../../common/img/back_white.png'),
      onPress: () => this.props.back(),
    };
    const firstName = this.props.friend.name.split(' ')[0];
    return (
      <ListContainer
        title={`${firstName}'s Schedule`}
        parallaxContent={<ProfilePicture userID={this.props.friend.id} size={100} />}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor={'#5597B8'}
        selectedSectionColor="#51CDDA"
        leftItem={backItem}>
        <ScheduleListView
          title="Day 1"
          day={1}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
        />
        <ScheduleListView
          title="Day 2"
          day={2}
          sessions={this.props.sessions}
          renderEmptyList={this.renderEmptyList}
        />
      </ListContainer>
    );
  }

  renderEmptyList(day) {
    return (
      <EmptySchedule
        title="Nothing to show."
        text={`${this.props.friend.name} has not added any sessions for day ${day}`}
      />
    );
  }
}

const getFriend = (store, props) => store.friendsSchedules.find(s => s.id === props.friend);

const getFriendSchedule = createSelector(
  getFriend,
  (friend) => friend.schedule,
);

const getSessions = createSelector(
  (store) => store.sessions,
  getFriendSchedule,
  (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

function select(store, props) {
  return {
    friend: getFriend(store, props),
    sessions: getSessions(store, props),
  };
}

function actions(dispatch) {
  return {
    back: () => dispatch(back()),
  };
}

module.exports = connect(select, actions)(FriendsScheduleView);
