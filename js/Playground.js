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

var React = require('React');
var View = require('View');

class Playground extends React.Component {
  state: {
    content: Array<ReactElement>;
  };

  constructor() {
    super();
    const content = [];
    const define = (name: string, render: Function) => {
      content.push(<Example key={name} render={render} />);
    };
    // var Module = require('F8PageControl');
    var Module = require('F8Header');
    // var Module = require('./tabs/schedule/AddToScheduleButton');
    // var Module = require('./rating/Header');
    // $FlowFixMe: doesn't understand static
    Module.__cards__(define);
    this.state = {content};
  }

  render() {
    return (
      <View style={{backgroundColor: '#336699', flex: 1,}}>
        {this.state.content}
      </View>
    );
  }
}

class Example extends React.Component {
  state = {
    inner: null
  };

  render() {
    const content = this.props.render(this.state.inner, (inner) => this.setState({inner}));
    return (
      <View>
        {content}
      </View>
    );

  }
}

module.exports = Playground;
