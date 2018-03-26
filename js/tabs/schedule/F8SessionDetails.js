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

"use strict";

import F8Colors from "../../common/F8Colors";
import F8FriendGoing from "./F8FriendGoing";
import F8SpeakerProfile from "./F8SpeakerProfile";
import MapView from "../../common/MapView";
import React from "react";
import AddToScheduleButton from "./AddToScheduleButton";
import formatDuration from "./formatDuration";
import { connect } from "react-redux";
import { addToSchedule, removeFromScheduleWithPrompt } from "../../actions";

import { Dimensions, View, ScrollView, PixelRatio } from "react-native";
import { Text, Heading2, Heading4, Paragraph } from "../../common/F8Text";
import F8Fonts from "../../common/F8Fonts";
import ActionsOverlay from "../../common/ActionsOverlay";
import F8ScrollingHeader from "../../common/F8ScrollingHeader";
import StyleSheet from "../../common/F8StyleSheet";
import SharingSettingsModal from "./SharingSettingsModal";
import LoginModal from "../../login/LoginModal";
import Carousel from "../../common/Carousel";

const WINDOW_WIDTH = Dimensions.get("window").width,
  HORIZONTAL_BREAKPOINT = WINDOW_WIDTH <= 320,
  CONTENT_PADDING_H = HORIZONTAL_BREAKPOINT ? 20 : 30;

const F8SessionDetails = React.createClass({
  getInitialState: function() {
    return {
      scrollTop: 0,
      sharingModal: false,
      loginModal: false
    };
  },

  render: function() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={({ nativeEvent }) =>
            this.setState({ scrollTop: nativeEvent.contentOffset.y })}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        >
          {this.renderLocation()}
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderSpeakers()}
          {this.renderFriendsGoing()}
          {this.renderMap()}
        </ScrollView>
        {this.renderActions()}
        {this.renderScrollingHeader()}
        {this.renderModals()}
      </View>
    );
  },

  renderLocation() {
    const { session } = this.props;
    const locationColor = F8Colors.colorForLocation(session.location);
    const locationTitle = session.location && session.location.toUpperCase();
    return (
      <Text style={[styles.location, { color: locationColor }]}>
        {locationTitle}
        <Text style={styles.time}>
          {locationTitle && " - "}
          {formatDuration(session.startTime, session.endTime).toUpperCase()}
        </Text>
      </Text>
    );
  },

  renderTitle() {
    if (this.props.session.title) {
      return (
        <Heading2 style={styles.title}>{this.props.session.title}</Heading2>
      );
    } else {
      return null;
    }
  },

  renderDescription() {
    if (this.props.session.description) {
      return <Paragraph>{this.props.session.description}</Paragraph>;
    } else {
      return null;
    }
  },

  renderSpeakers() {
    const speakersProfiles = (this.props.session.speakers || []
    ).map(speaker => (
      <F8SpeakerProfile
        key={speaker.name}
        speaker={speaker}
        style={{ marginTop: 5 }}
      />
    ));

    if (speakersProfiles.length) {
      return <Section title="Hosted By">{speakersProfiles}</Section>;
    } else {
      return null;
    }
  },

  renderFriendsGoing() {
    const friendsGoing = this.props.friendsGoing.map(friend => (
      <F8FriendGoing
        key={friend.id}
        friend={friend}
        onPress={() => this.props.navigator.push({ friend })}
      />
    ));
    if (friendsGoing.length) {
      return <Section title="Friends Going">{friendsGoing}</Section>;
    } else {
      return null;
    }
  },

  renderMap() {
    if (!this.props.map) {
      return null;
    }
    const mapWidth = Carousel.CardWidth - CONTENT_PADDING_H * 2;
    return <MapView width={mapWidth} style={styles.map} map={this.props.map} />;
  },

  renderActions() {
    const title = this.props.session.title || "";
    const isReactTalk = title.indexOf("React") > -1;
    return (
      <ActionsOverlay
        gradientColors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        buttonContainerStyles={{ paddingHorizontal: 15, paddingBottom: 12 }}
        style={styles.actions}
      >
        <AddToScheduleButton
          style={{ flex: 1 }}
          addedImageSource={
            isReactTalk ? require("./img/added-react.png") : null
          }
          isAdded={this.props.isAddedToSchedule}
          onPress={this.toggleAdded}
        />
      </ActionsOverlay>
    );
  },

  renderScrollingHeader() {
    const { title } = this.props.session;
    return (
      <F8ScrollingHeader
        contentInset={CONTENT_PADDING_H}
        scrollTop={this.state.scrollTop}
        text={title}
      />
    );
  },

  renderModals() {
    return [
      <SharingSettingsModal
        key="modal_sharingsettings"
        navigator={this.props.navigator}
        visible={this.state.sharingModal}
        animationType="fade"
        transparent={true}
        onSetSharing={_ => {
          this.setState({ sharingModal: false });
        }}
      />,
      <LoginModal
        key="modal_login"
        visible={this.state.loginModal}
        animationType="fade"
        transparent={true}
        navigator={this.props.navigator}
        onLogin={this.addToSchedule}
        onClose={_ => this.setState({ loginModal: false })}
      />
    ];
  },

  toggleAdded: function() {
    if (this.props.isAddedToSchedule) {
      this.props.removeFromScheduleWithPrompt();
    } else {
      this.addToSchedule();
    }
  },

  addToSchedule: function() {
    if (!this.props.isLoggedIn) {
      // this.props.navigator.push({
      //   login: true, // TODO: Proper route
      //   callback: this.addToSchedule,
      // });
      this.setState({ loginModal: true });
    } else {
      this.props.addToSchedule();
      if (this.props.sharedSchedule === null) {
        setTimeout(_ => this.setState({ sharingModal: true }), 1000);
        // setTimeout(() => this.props.navigator.push({share: true}), 1000);
      }
    }
  }
});

class Section extends React.Component {
  props: {
    title?: string,
    children?: any
  };

  render() {
    const { children } = this.props;
    if (React.Children.count(children) === 0) {
      return null;
    }
    let header;
    if (this.props.title) {
      header = (
        <Heading4 style={styles.sectionTitle}>
          {this.props.title.toUpperCase()}
        </Heading4>
      );
    }
    return (
      <View style={styles.section}>
        {header}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentContainer: {
    paddingTop: 23,
    paddingHorizontal: CONTENT_PADDING_H,
    paddingBottom: 93
  },
  miniHeader: {
    backgroundColor: F8Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 24,
    top: 0,
    right: 24,
    paddingVertical: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "rgba(153, 162, 178, 1)"
  },
  miniTitle: {
    fontSize: 13,
    color: F8Colors.tangaroa,
    ios: {
      textAlign: "left"
    }
  },
  location: {
    fontSize: 13,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helveticaBold")
  },
  time: {
    color: F8Colors.tangaroa,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helveticaBold")
  },
  title: {
    marginVertical: 15,
    color: F8Colors.blue
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    marginBottom: 6
  },
  actions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  map: {
    marginTop: 32
  }
});

function select(store, props) {
  const sessionID = props.session.id;
  const friendsGoing = store.friendsSchedules.filter(
    friend => friend.schedule && friend.schedule[sessionID]
  );
  const map = store.maps.find(({ name }) => name === props.session.location);

  return {
    isAddedToSchedule: !!store.schedule[props.session.id],
    isLoggedIn: store.user.isLoggedIn,
    sharedSchedule: store.user.sharedSchedule,
    sessionURLTemplate: store.config.sessionURLTemplate,
    topics: store.topics,
    friendsGoing,
    map
  };
}

function actions(dispatch, props) {
  let id = props.session.id;
  return {
    addToSchedule: () => dispatch(addToSchedule(id)),
    removeFromScheduleWithPrompt: () =>
      dispatch(removeFromScheduleWithPrompt(props.session))
  };
}

module.exports = connect(select, actions)(F8SessionDetails);
