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

Parse.Cloud.define('friends', function(request, response) {
  Parse.Cloud.useMasterKey();

  var user = request.user;
  if (!user) {
    return response.success([]);
  }
  if (!Parse.FacebookUtils.isLinked(user)) {
    return response.error('Current user is not linked to Facebook');
  }

  var authData = user.get('authData');
  var token = authData.facebook.access_token;
  // TODO: Fetch all friends using paging
  Parse.Cloud.httpRequest({
    url: 'https://graph.facebook.com/me/friends?fields=id&access_token=' + token,
  }).then(
    function(res) {
      var friendIds = res.data.data.map(function(friend) {
        return friend.id;
      });

      var query = new Parse.Query(Parse.User)
        .containedIn('facebook_id', friendIds);

      return query.find().then(
        function(users) {
          return Parse.Promise.when(users.map(fetchSchedule));
        }
      ).then(
        function(/* ...friends */) {
          // Parse Cloud Code and Parse Server have slightly different behavior
          // of Parse.Promise.when
          var args = arguments;
          if (arguments.length === 1 && Array.isArray(arguments[0])) {
            args = arguments[0];
          }
          return Array.prototype.filter.call(args, function(friend) {
            return friend !== null;
          });
        }
      );
    }
  ).then(
    function(value) { response.success(value); },
    function(error) { response.error(error); }
  );
});

function fetchSchedule(user) {
  if (!user.get('sharedSchedule')) {
    return Parse.Promise.as(null);
  }
  // https://www.parse.com/questions/can-i-use-include-in-a-query-to-include-all-members-of-a-parserelation-error-102
  return user.relation('mySchedule').query().find().then(
    function(sessions) {
      var schedule = {};
      sessions.forEach(function(session) {
        schedule[session.id] = true;
      });
      return {
        id: user.get('facebook_id'),
        name: user.get('name'),
        schedule: schedule,
      };
    }
  );
}
