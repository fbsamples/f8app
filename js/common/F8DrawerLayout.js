
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
 * @providesModule F8DrawerLayout
 */
'use strict';

var React = require('React');
var DrawerLayoutAndroid = require('DrawerLayoutAndroid');

class F8DrawerLayout extends React.Component {
  _drawer: ?DrawerLayoutAndroid;

  constructor(props: any, context: any) {
    super(props, context);

    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => this._drawer = drawer}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }

  componentDidUpdate(lastProps: any) {
    if (this.props.isOpen && !lastProps.isOpen) {
      this._drawer && this._drawer.openDrawer();
    } else if (!this.props.open && lastProps.isOpen) {
      this._drawer && this._drawer.closeDrawer();
    }
  }

  componentWillUnmount() {
    this._drawer = null;
  }

  onDrawerOpen() {
    // TODO: Fire props.onDrawerOpen and onDrawerClose at the right times
  }

  onDrawerClose() {
    // TODO: Fire props.onDrawerOpen and onDrawerClose at the right times
  }
}

module.exports = F8DrawerLayout;
