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

const createParseReducer = require('./createParseReducer');

export type Speaker = {
  id: string;
  bio: string;
  name: string;
  pic: string;
  title: string;
};

export type Session = {
  id: string;
  day: number;
  allDay: boolean;
  title: string;
  description: string;
  hasDetails: boolean;
  slug: string;
  speakers: Array<Speaker>;
  onMySchedule: boolean;
  tags: Array<string>;
  startTime: number;
  endTime: number;
  map: ?string;
  location: ?string;
};

function fromParseSpeaker(speaker: Object): Speaker {
  var pic = speaker.get('speakerPic');
  return {
    id: speaker.id,
    bio: speaker.get('speakerBio'),
    name: speaker.get('speakerName'),
    pic: pic && pic.url(),
    title: speaker.get('speakerTitle'),
  };
}

function fromParseSessions(session: Object): Session {
  return {
    id: session.id,
    day: session.get('day'),
    allDay: session.get('allDay'),
    title: session.get('sessionTitle'),
    description: session.get('sessionDescription'),
    hasDetails: session.get('hasDetails'),
    slug: session.get('sessionSlug'),
    speakers: (session.get('speakers') || []).map(fromParseSpeaker),
    onMySchedule: session.get('onMySchedule'),
    tags: session.get('tags') || [],
    startTime: session.get('startTime') && session.get('startTime').getTime(),
    endTime: session.get('endTime') && session.get('endTime').getTime(),
    map: session.get('sessionMap') && session.get('sessionMap').url(),
    location: session.get('sessionLocation'),
  };
}

module.exports = createParseReducer('LOADED_SESSIONS', fromParseSessions);
