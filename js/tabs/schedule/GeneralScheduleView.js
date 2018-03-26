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
 */
"use strict";

import EmptySchedule from "./EmptySchedule";
import FilterHeader from "./FilterHeader";
import FilterSessions from "./filterSessions";
import ListContainer from "../../common/ListContainer";
import React from "react";
import ScheduleListView from "./ScheduleListView";
import FilterScreen from "../../filter/FilterScreen";
import { connect } from "react-redux";
import {
  switchDay,
  applyScheduleFilter,
  clearScheduleFilter
} from "../../actions";

import type { Session } from "../../reducers/sessions";
import { Dimensions } from "react-native";
import { Platform, View } from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import F8TimelineBackground from "../../common/F8TimelineBackground";
import HideCompleted from "./HideCompleted";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";
import F8ScheduleGantt from "./F8ScheduleGantt";
import { sessionsHappeningToday } from "../../common/convertTimes";

// TODO: Move from reselect to memoize?
import { createSelector } from "reselect";

const data = createSelector(
  store => store.sessions,
  store => store.scheduleFilter,
  (sessions, filter) => FilterSessions.byTopics(sessions, filter)
);

const GANTT_PADDDING_H = 14,
  GANTT_WIDTH = Dimensions.get("window").width - GANTT_PADDDING_H * 2;

type Props = {
  filter: any,
  day: number,
  sessions: Array<Session>,
  navigator: Navigator,
  logOut: () => void,
  switchDay: (day: number) => void
};

class GeneralScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).switchDay = this.switchDay.bind(this);
    (this: any).openFilterScreen = this.openFilterScreen.bind(this);
    (this: any).renderStickyHeader = this.renderStickyHeader.bind(this);

    this.state = {
      hideCompleted: false,
      filterModal: false,
      sessionsHappeningToday: sessionsHappeningToday(props.now),
      incompleteSessions: FilterSessions.byCompleted(props.sessions, props.now)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sessions !== this.props.sessions ||
      nextProps.now !== this.props.now
    ) {
      this.setState({
        sessionsHappeningToday: sessionsHappeningToday(nextProps.now),
        incompleteSessions: FilterSessions.byCompleted(
          nextProps.sessions,
          nextProps.now
        )
      });
    }
  }

  render() {
    let sessions = [...this.props.sessions];
    if (this.state.hideCompleted && this.state.sessionsHappeningToday) {
      sessions = [...this.state.incompleteSessions];
    }

    const content = (
      <ListContainer
        title="Schedule"
        selectedSegment={this.props.day - 1}
        onSegmentChange={this.switchDay}
        stickyHeader={this.renderStickyHeader()}
        leftItem={{
          title: "Map",
          layout: "icon",
          icon: require("../../common/img/header/map.png"),
          onPress: _ =>
            this.props.navigator && this.props.navigator.push({ maps: true })
        }}
        rightItem={{
          icon: require("../../common/img/header/filter.png"),
          title: "Filter",
          onPress: this.openFilterScreen
        }}
      >
        <ScheduleListView
          title="Day 1"
          day={1}
          sessions={sessions}
          renderEmptyList={this.renderEmptyList}
          renderHeader={_ => this.renderGanttChart(1, sessions)}
          renderFooter={_ => <F8TimelineBackground height={80} />}
          navigator={this.props.navigator}
        />
        <ScheduleListView
          title="Day 2"
          day={2}
          sessions={sessions}
          renderEmptyList={this.renderEmptyList}
          renderHeader={_ => this.renderGanttChart(2, sessions)}
          renderFooter={_ => <F8TimelineBackground height={80} />}
          navigator={this.props.navigator}
        />
      </ListContainer>
    );

    if (Platform.OS === "ios") {
      return content;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {content}
          <FilterScreen
            visible={this.state.filterModal}
            topics={this.props.topics}
            selectedTopics={this.props.filter}
            onClose={_ => this.setState({ filterModal: false })}
            onApply={selected => this.props.filterTopics(selected)}
          />
        </View>
      );
    }
  }

  renderStickyHeader() {
    let hideCompletedBar;
    if (this.state.sessionsHappeningToday) {
      hideCompletedBar = (
        <HideCompleted
          enabled={this.state.hideCompleted}
          onChange={hideCompleted => this.setState({ hideCompleted })}
        />
      );
    }
    let filterHeader;
    if (Object.keys(this.props.filter).length > 0) {
      filterHeader = (
        <FilterHeader
          filter={this.props.filter}
          onClear={_ => this.props.clearFilter()}
        />
      );
    }

    return (
      <View>
        {hideCompletedBar}
        {filterHeader}
      </View>
    );
  }

  renderGanttChart(day: number, sessions: Array<Session>) {
    const hasFilters = Object.keys(this.props.filter).length > 0;

    if (hasFilters || !sessions.length) {
      // intercept when list is filtered
      // also disallow empty sessions to prevent the overflow color view from rendering
      return <View style={{ height: 15 }} />; // TODO: better solution than spacer view
    }
    return (
      <View style={{ paddingBottom: 15 }}>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 15,
            height: 1000,
            backgroundColor: F8Colors.tangaroa
          }}
        />
        <F8ScheduleGantt
          style={{
            backgroundColor: F8Colors.tangaroa,
            paddingTop: 18,
            paddingBottom: 12,
            paddingHorizontal: GANTT_PADDDING_H
          }}
          sessions={sessions}
          day={day}
          width={GANTT_WIDTH}
          now={this.props.now}
        />
      </View>
    );
  }

  renderEmptyList(day: number, containerHeight: number) {
    const otherDay = day === 1 ? 2 : 1;
    const dayDir = day === 1 ? "left" : "right";
    return (
      <EmptySchedule
        style={{ height: containerHeight }}
        title={`No Day ${day} matches`}
        titleStyles={{ marginBottom: 5 }}
        text={`Swipe ${dayDir} for Day ${otherDay}`.toUpperCase()}
        textStyles={{
          fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helvetica"),
          color: F8Colors.colorWithAlpha("tangaroa", 0.5),
          fontSize: 13
        }}
      />
    );
  }

  openFilterScreen() {
    if (Platform.OS === "ios") {
      this.props.navigator.push({
        filter: true,
        topics: this.props.topics,
        selectedTopics: this.props.filter,
        onApply: selected => this.props.filterTopics(selected)
      });
    } else {
      this.setState({ filterModal: true });
    }
  }

  switchDay(page: number) {
    this.props.switchDay(page + 1);
  }
}

function select(store) {
  return {
    day: store.navigation.day,
    filter: store.scheduleFilter,
    topics: store.scheduleTopics,
    sessions: data(store)
  };
}

function actions(dispatch) {
  return {
    switchDay: day => dispatch(switchDay(day)),
    filterTopics: selected => dispatch(applyScheduleFilter(selected)),
    clearFilter: _ => dispatch(clearScheduleFilter())
  };
}

module.exports = connect(select, actions)(GeneralScheduleView);
