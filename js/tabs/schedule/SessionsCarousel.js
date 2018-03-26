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

import F8Analytics from "../../F8Analytics";
import React from "react";
import { Platform, StatusBar } from "react-native";
import F8SessionDetails from "./F8SessionDetails";
import F8PageControl from "../../common/F8PageControl";
import F8Header from "../../common/F8Header";
import StyleSheet from "../../common/F8StyleSheet";
import formatTime from "./formatTime";
import Carousel from "../../common/Carousel";
import { connect } from "react-redux";
import { loadFriendsSchedules, shareSession } from "../../actions";

import type { Dispatch } from "../../actions/types";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";

import { Text, View, Navigator } from "react-native";

import type { Session } from "../../reducers/sessions";

type Context = {
  rowIndex: number, // TODO: IndexWithinSection
  sectionLength: number,
  sectionTitle: string
};

type Props = {
  allSessions?: { [sectionID: string]: { [sessionID: string]: Session } },
  session: Session,
  navigator: Navigator,
  dispatch: Dispatch
};

class SessionsCarusel extends React.Component {
  props: Props;
  state: {
    day: number,
    count: number,
    selectedIndex: number,
    flatSessionsList: Array<Session>,
    contexts: Array<Context>
  };

  constructor(props: Props) {
    super(props);

    const flatSessionsList = [];
    const contexts: Array<Context> = [];
    let allSessions = this.props.allSessions;
    if (!allSessions) {
      const { session } = this.props;
      allSessions = {
        [formatTime(session.startTime)]: { [session.id]: session }
      };
    }

    // TODO: Add test
    for (let sectionID in allSessions) {
      const sectionLength = Object.keys(allSessions[sectionID]).length;
      let rowIndex = 0;
      for (let sessionID in allSessions[sectionID]) {
        const session = allSessions[sectionID][sessionID];
        flatSessionsList.push(session);
        contexts.push({
          rowIndex,
          sectionLength,
          sectionTitle: sectionID
        });
        rowIndex++;
      }
    }

    const selectedIndex = flatSessionsList.findIndex(
      s => s.id === this.props.session.id
    );

    this.state = {
      day: this.props.session.day,
      count: flatSessionsList.length,
      selectedIndex,
      flatSessionsList,
      contexts
    };
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
    (this: any).shareCurrentSession = this.shareCurrentSession.bind(this);
  }

  render() {
    const { rowIndex, sectionLength, sectionTitle } = this.state.contexts[
      this.state.selectedIndex
    ];

    const backItem = {
      title: "Back",
      layout: "icon",
      icon: require("../../common/img/header/back.png"),
      onPress: _ => this.props.navigator.pop()
    };

    const rightItem = {
      title: "Share",
      layout: "icon",
      icon: require("../../common/img/header/share.png"),
      onPress: this.shareCurrentSession
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <F8Header
          backgroundColor={F8Colors.palatinateBlue}
          itemsColor={F8Colors.white}
          navItem={backItem}
          rightItem={rightItem}
          style={Platform.OS === "ios" ? { height: 70 } : {}}
        >
          <View style={styles.headerContent}>
            <Text style={styles.day}>{`DAY ${this.state.day}`}</Text>
            <Text style={styles.time}>{sectionTitle.toLowerCase()}</Text>
            <F8PageControl count={sectionLength} selectedIndex={rowIndex} />
          </View>
        </F8Header>
        <Carousel
          count={this.state.count}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    // const iOSKey = Platform.OS === 'ios' ? { key: `SCC_${this.state.flatSessionsList[index].id}`} : {};
    return (
      <F8SessionDetails
        navigator={this.props.navigator}
        session={this.state.flatSessionsList[index]}
      />
    );
  }

  shareCurrentSession() {
    const session = this.state.flatSessionsList[this.state.selectedIndex];
    this.props.dispatch(shareSession(session));
  }

  componentDidMount() {
    this.track(this.state.selectedIndex);
    this.props.dispatch(loadFriendsSchedules());
  }

  dismiss() {
    this.props.navigator.pop();
  }

  handleIndexChange(selectedIndex: number) {
    this.track(selectedIndex);
    this.setState({ selectedIndex });
  }

  track(index: number) {
    const { id } = this.state.flatSessionsList[index];
    F8Analytics.logEvent("View Session", 1, { id });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-end",
      paddingBottom: 9
    },
    ios: {
      marginTop: -5,
      alignItems: "center"
      // justifyContent: 'center',
    }
  },
  title: {
    ios: {
      textAlign: "center"
    }
  },
  day: {
    color: F8Colors.yellow,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helveticaBold"),
    fontSize: 13,

    android: {
      marginBottom: -4
    }
  },
  time: {
    color: F8Colors.white,
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold"),
    fontSize: 15,

    ios: {
      marginVertical: 2
    },
    android: {
      marginBottom: 3
    }
  }
});

module.exports = connect()(SessionsCarusel);
