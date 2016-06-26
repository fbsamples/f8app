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
const F8Colors = require('F8Colors');
const {
  Image,
  Text,
  View,
  StyleSheet,
} = require('react-native');

import type {Session} from '../reducers/sessions';

type Props = {
  session: Session;
};

function Header({session}: Props) {
  const pics = session.speakers.map((speaker) => (
    <Image
      key={speaker.id}
      source={{uri: speaker.pic}}
      style={styles.pic}
    />
  ));
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require('./img/header.png')} />
      </View>
      <Text style={styles.title}>
        {session.title}
      </Text>
      <View style={styles.speakers}>
        {pics}
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    paddingHorizontal: 10,
  },
  background: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 12,
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  speakers: {
    marginTop: 15,
    flexDirection: 'row',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 2,
  },
});

module.exports = Header;
module.exports.__cards__ = (define) => {
  const MOCK_SESSION = {
    id: 'mock1',
    title: 'Building For the Next Billion',
    speakers: [
      {
        id: '1',
        bio: '',
        name: 'Foo',
        title: '',
        pic: 'https://graph.facebook.com/100001244322535/picture?width=60&height=60',
      },
      {
        id: '2',
        bio: '',
        name: 'Bar',
        title: '',
        pic: 'https://graph.facebook.com/10152531777042364/picture?width=60&height=60',
      },
    ],
    day: 1,
    allDay: false,
    description: '...',
    startTime: 0,
    endTime: 0,
    hasDetails: true,
    location: 'space',
    map: 'space',
    onMySchedule: false,
    slug: 'next-billion',
    tags: [],
  };

  define('Example', (state = null, update) => (
    <Header session={MOCK_SESSION} />
  ));

  define('Long title', () => (
    <Header session={{
      ...MOCK_SESSION,
      title: 'Inside Facebook\'s Infrastructure (Part 1): The System that Serves Billions',
      speakers: [],
    }} />
  ));
};
