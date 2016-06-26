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

const React = require('react');
const {
  Text,
  View,
  ToastAndroid,
  Platform,
} = require('react-native');
const StyleSheet = require('F8StyleSheet');
const RatingCard = require('./RatingCard');
const F8Header = require('F8Header');
const Carousel = require('../common/Carousel');
const F8PageControl = require('F8PageControl');
const { connect } = require('react-redux');
const { submitSurveyAnswers } = require('../actions');

import type {Survey} from '../reducers/surveys';
import type {Session} from '../reducers/sessions';
import type {Dispatch} from '../actions/types';

type Props = {
  sessions: Array<Session>;
  surveys: Array<Survey>;
  navigator: any;
  dispatch: Dispatch;
};

class RatingScreen extends React.Component {
  props: Props;
  state: {
    selectedIndex: number;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };

    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
    (this: any).dismiss = this.dismiss.bind(this);
  }

  render() {
    const {surveys} = this.props;
    return (
      <View style={styles.container}>
        <F8Header
          style={styles.header}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: require('../common/BackButtonIcon'),
            onPress: this.dismiss,
          }}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {surveys.length > 1
                ? 'Review these sessions'
                : 'Review this session'
              }
            </Text>
            <F8PageControl
              count={surveys.length}
              selectedIndex={this.state.selectedIndex}
            />
          </View>
        </F8Header>
        <Carousel
          count={surveys.length}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    const survey = this.props.surveys[index];
    const session = this.props.sessions.find((s) => s.id === survey.sessionId);
    return (
      <RatingCard
        style={styles.card}
        session={session}
        questions={survey.questions}
        onSubmit={(answers) => this.submitAnswers(index, answers)}
      />
    );
  }

  submitAnswers(index: number, answers: Array<number>) {
    const survey = this.props.surveys[index];
    this.props.dispatch(submitSurveyAnswers(survey.id, answers)).then(
      () => this.proceedToPage(index + 1)
    );
  }

  proceedToPage(index: number) {
    if (index < this.props.surveys.length) {
      this.setState({selectedIndex: index});
    } else {
      this.props.navigator.pop();
      if (Platform.OS === 'android') {
        ToastAndroid.show('Thanks for your review!', ToastAndroid.SHORT);
      }
    }
  }

  handleIndexChange(selectedIndex: number) {
    this.setState({ selectedIndex });
  }

  dismiss() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: '#5597B8',
    },
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    ios: {
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    ios: {
      borderRadius: 2,
      marginHorizontal: 3,
    },
  },
});

function select(store) {
  return {
    sessions: store.sessions,
  };
}

module.exports = connect(select)(RatingScreen);
