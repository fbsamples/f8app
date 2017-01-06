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

import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import {Schema} from './schema/schema';
import Parse from 'parse/node';
import {ParseServer} from 'parse-server';
import ParseDashboard from 'parse-dashboard';

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'oss-f8-app-2016';
const MASTER_KEY = process.env.MASTER_KEY || '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();

function getSchema() {
  if (!IS_DEVELOPMENT) {
    return Schema;
  }

  delete require.cache[require.resolve('./schema/schema.js')];
  return require('./schema/schema.js').Schema;
}

const server = express();

server.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
  })
);

if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':');
    users = [{user, pass}];
    console.log(users);
  }
  server.use(
    '/dashboard',
    ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'F8-App-2016',
      }],
      users,
    }, IS_DEVELOPMENT),
  );
}

server.use(
  '/graphql',
  graphQLHTTP((request) => {
    return {
      graphiql: IS_DEVELOPMENT,
      pretty: IS_DEVELOPMENT,
      schema: getSchema(),
      rootValue: Math.random(), // TODO: Check credentials, assign user
    };
  })
);

server.use('/', (req, res) => res.redirect('/graphql'));

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));
