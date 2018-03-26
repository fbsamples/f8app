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

// Depdencies
import React from "react";
import FacebookSDK from "./FacebookSDK";
import Parse from "parse/react-native";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

// Components
import { Text, AsyncStorage } from "react-native";
import F8App from "./F8App";
import LaunchScreen from "./common/LaunchScreen";

// Config
import { serverURL, parseAppID } from "./env";

function setup(): ReactClass<{}> {
  console.disableYellowBox = true;
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(parseAppID);
  Parse.serverURL = `${serverURL}/parse`;
  console.log("DEBUG!!! " + serverURL);

  FacebookSDK.init();
  Parse.FacebookUtils.init();

  // TODO: Don't prevent fontScaling on iOS (currently breaks UI)
  Text.defaultProps.allowFontScaling = false;

  class Root extends React.Component {
    state: {
      isLoading: boolean,
      store: any
    };

    constructor() {
      super();
      this.state = {
        storeCreated: false,
        storeRehydrated: false,
        store: null
      };
    }

    componentDidMount() {
      configureStore(
        // rehydration callback (after async compatibility and persistStore)
        _ => this.setState({ storeRehydrated: true })
      ).then(
        // creation callback (after async compatibility)
        store => this.setState({ store, storeCreated: true })
      );
    }

    render() {
      if (!this.state.storeCreated || !this.state.storeRehydrated) {
        return <LaunchScreen />;
      }
      return (
        <Provider store={this.state.store}>
          <F8App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
