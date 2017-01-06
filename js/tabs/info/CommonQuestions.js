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

var ItemsWithSeparator = require('../../common/ItemsWithSeparator');
var LayoutAnimation = require('LayoutAnimation');
var React = require('React');
var Section = require('./Section');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var F8Touchable = require('F8Touchable');
var View = require('View');

class CommonQuestions extends React.Component {
  render() {
    let content = this.props.faqs.map(({question, answer}) =>
      (<Row question={question} answer={answer} key={question} />)
    );
    return (
      <Section title="Common questions">
        <ItemsWithSeparator separatorStyle={styles.separator}>
          {content}
        </ItemsWithSeparator>
      </Section>
    );
  }
}

class Row extends React.Component {
  props: {
    question: string;
    answer: string;
  };

  state: {
    expanded: boolean;
  };

  constructor() {
    super();
    this.state = { expanded: false };
  }

  render() {
    var answer;
    if (this.state.expanded) {
      answer = (
        <View style={styles.answer}>
          <Text style={styles.text}>
            {this.props.answer}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <F8Touchable onPress={() => this.toggle()}>
          <View style={styles.question} >
            <Text style={styles.symbol}>
              {this.state.expanded ? '\u2212' : '+'}
            </Text>
            <Text style={styles.text}>
              {this.props.question}
            </Text>
          </View>
        </F8Touchable>
        {answer}
      </View>
    );
  }

  toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  }
}

var styles = StyleSheet.create({
  separator: {
    marginHorizontal: 20,
  },
  question: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  symbol: {
    fontSize: 15,
    lineHeight: 21,
    width: 22,
    color: '#99A7B9',
  },
  answer: {
    padding: 14,
    paddingLeft: 20 + 22,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    color: '#002350',
    flex: 1,
  },
});

module.exports = CommonQuestions;
