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
 */

'use strict';
/* global Parse */

var Agenda = Parse.Object.extend('Agenda');
var Attendance = Parse.Object.extend('Attendance');
var Survey = Parse.Object.extend('Survey');
var SurveyResult = Parse.Object.extend('SurveyResult');

Parse.Cloud.define('send_surveys', function(request, response) {
  if (request.master) {
    Parse.Cloud.useMasterKey();
  } else {
    return response.error('Need master key');
  }

  var sessionId = request.params.sessionId;
  if (!sessionId) {
    return response.error('Need sessionId');
  }

  console.log('Fetching attendees for ' + sessionId);
  var agenda = new Agenda({id: sessionId});
  var attendees = new Parse.Query(Attendance)
    .equalTo('agenda', agenda)
    .notEqualTo('sent', true)
    .find();
  var survey = new Parse.Query(Survey)
    .equalTo('session', agenda)
    .first();

  Parse.Promise.when(attendees, survey, new Parse.Query(Agenda).get(sessionId))
    .then(sendSurveys)
    .then(
      function(value) { response.success(value); },
      function(error) { response.error(error); }
    );
});

Parse.Cloud.define('surveys', function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  if (!user) {
    return response.success([]);
  }

  new Parse.Query(SurveyResult)
    .equalTo('user', user)
    .equalTo('rawAnswers', null)
    .include('survey')
    .include('survey.session')
    .find()
    .then(toSurveys)
    .then(
      function(value) { response.success(value); },
      function(error) { response.error(error); }
    );
});

Parse.Cloud.define('submit_survey', function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  if (!user) {
    return response.error({message: 'Not logged in'});
  }

  var params = request.params;
  if (!params.id || !params.answers) {
    return response.error({message: 'Need id and answers'});
  }

  new Parse.Query(SurveyResult)
    .equalTo('user', user)
    .equalTo('objectId', params.id)
    .find()
    .then(function(results) {
      if (results.length === 0) {
        throw new Error('No user/id combination found');
      }
      return results[0].save({
        a1: params.answers[0],
        a2: params.answers[1],
        rawAnswers: JSON.stringify(params.answers)
      });
    }).then(
      function(value) { response.success(value); },
      function(error) { response.error(error); }
    );
});

function sendSurveys(attendees, survey, session) {
  if (!survey) {
    throw new Error('Survey not found for session ' + session.id);
  }

  console.log('Found ' + attendees.length + ' attendees');
  return Parse.Promise.when(attendees.map(function(record) {
    var user = record.get('user');
    return new SurveyResult().save({
      user: user,
      survey: survey,
    }).then(function() {
      return Parse.Push.send({
        where: new Parse.Query(Parse.Installation).equalTo('user', user),
        data: {
          badge: 'Increment',
          alert: 'Please rate "' + session.get('sessionTitle') + '"',
          e: true, // ephemeral
        }
      });
    }).then(function() {
      return record.save({sent: true});
    });
  })).then(function() {
    return arguments.length;
  });
}

function toSurveys(emptyResults) {
  return emptyResults.map(function(emptyResult) {
    var survey = emptyResult.get('survey');

    var questions = [];
    if (survey.get('q1')) {
      questions.push({
        text: survey.get('q1'),
        lowLabel: 'Not at all',
        highLabel: 'Very useful',
      });
    }

    if (survey.get('q2')) {
      questions.push({
        text: survey.get('q2'),
        lowLabel: 'Not likely',
        highLabel: 'Very likely',
      });
    }

    return {
      id: emptyResult.id,
      sessionId: survey.get('session').id,
      questions: questions,
    };
  });
}
