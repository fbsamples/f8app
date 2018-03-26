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
 * @flow
 */
"use strict";

import React from "react";
import { StyleSheet, Alert } from "react-native";
import F8Button from "./F8Button";
import { logInWithFacebook } from "../actions";
import { connect } from "react-redux";

class LoginButton extends React.Component {
  props: {
    style: any,
    source?: string, // For Analytics
    dispatch: (action: any) => Promise<any>,
    onLoggedIn: ?() => void
  };
  state: {
    isLoading: boolean
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <F8Button
          theme="fb"
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => {}}
        />
      );
    }

    return (
      <F8Button
        theme="fb"
        style={[styles.button, this.props.style]}
        icon={require("./img/buttons/logo-fb.png")}
        caption="Continue with Facebook"
        fontSize={13}
        onPress={() => this.logIn()}
      />
    );
  }

  async logIn() {
    const { dispatch, onLoggedIn } = this.props;

    this.setState({ isLoading: true });
    try {
      await Promise.all([dispatch(logInWithFacebook(this.props.source))]);
    } catch (e) {
      const message = e.message || e;
      if (message !== "Timed out" && message !== "Canceled by user") {
        Alert.alert(message);
      }
      return;
    } finally {
      this._isMounted && this.setState({ isLoading: false });
    }

    onLoggedIn && onLoggedIn();
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: 284
  }
});

module.exports = connect()(LoginButton);
