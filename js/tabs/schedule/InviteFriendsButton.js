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

var React = require('React');
var F8Button = require('F8Button');
var {AppInviteDialog, AppEventsLogger} = require('react-native-fbsdk');
var { connect } = require('react-redux');

class InviteFriendsButton extends React.Component {
  props: {
    appLinkURL: string;
    appInvitePreviewImageURL: string;
    style: any;
  };

  render() {
    const {appLinkURL, style} = this.props;
    if (!appLinkURL) {
      return null;
    }

    return (
      <F8Button
        style={style}
        caption="Invite friends to the F8 app"
        onPress={() => this.inviteFriends()}
      />
    );
  }

  inviteFriends() {
    AppEventsLogger.logEvent('Invite Friends', 1);
    AppInviteDialog.show({
      applinkUrl: this.props.appLinkURL,
      previewImageUrl: this.props.appInvitePreviewImageURL,
    }).catch((error) => {
      if (error.message) {
        alert(error.message);
      }
    });
  }
}

function select(store) {
  return {
    appLinkURL: store.config.appLinkURL,
    appInvitePreviewImageURL: store.config.appInvitePreviewImageURL,
  };
}

module.exports = connect(select)(InviteFriendsButton);
