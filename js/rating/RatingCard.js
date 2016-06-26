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
  View,
  ScrollView,
} = require('react-native');
const StyleSheet = require('F8StyleSheet');
const Header = require('./Header');
const RatingQuestion = require('./RatingQuestion');
const F8Button = require('F8Button');

import type {Question} from '../reducers/surveys';
import type {Session} from '../reducers/sessions';

type Props = {
  session: Session;
  questions: Array<Question>;
  onSubmit: (answers: Array<number>) => void;
  style?: any;
};

class RatingCard extends React.Component {
  props: Props;
  state: Object;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const questions = this.props.questions.map((question, ii) => (
      <RatingQuestion
        key={ii}
        style={styles.question}
        question={question}
        rating={this.state[ii]}
        onChange={(rating) => this.setState({[ii]: rating})}
      />
    ));
    const completed = Object.keys(this.state).length === this.props.questions.length;
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView>
          <Header session={this.props.session} />
          {questions}
        </ScrollView>
        <F8Button
          style={styles.button}
          type={completed ? 'primary' : 'bordered'}
          caption="Submit Review"
          onPress={() => completed && this.submit()}
        />
      </View>
    );
  }

  submit() {
    const answers = this.props.questions.map((_, ii) => this.state[ii]);
    this.props.onSubmit(answers);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  question: {
    padding: 40,
    paddingVertical: 25,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 20,
  }
});

module.exports = RatingCard;
