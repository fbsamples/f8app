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
 * @providesModule F8InfoView
 * @flow
 */
'use strict';

var CommonQuestions = require('./CommonQuestions');
var LinksList = require('./LinksList');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var React = require('React');
var Relay = require('react-relay');
var View = require('View');
var WiFiDetails = require('./WiFiDetails');


const POLICIES_LINKS = [{
  title: 'Terms of Service',
  url: 'https://m.facebook.com/terms?_rdr',
}, {
  title: 'Data Policy',
  url: 'https://m.facebook.com/policies?_rdr',
}, {
  title: 'Code of Conduct',
  url: 'https://www.fbf8.com/code-of-conduct',
}];

function F8InfoView() {
  return (
    <ListContainer
      title="Information"
      backgroundImage={require('./img/info-background.png')}
      backgroundColor={'#47BFBF'}>
      <InfoList />
    </ListContainer>
  );
}

function InfoList({viewer: {config, faqs, pages}, ...props}) {
  return (
    <PureListView
      renderEmptyList={() => (
        <View>
          <WiFiDetails
            network={config.wifiNetwork}
            password={config.wifiPassword}
          />
          <CommonQuestions faqs={faqs} />
          <LinksList title="Facebook pages" links={pages} />
          <LinksList title="Facebook policies" links={POLICIES_LINKS} />
        </View>
      )}
      {...(props: any /* flow can't guarantee the shape of props */)}
    />
  );
}

InfoList = Relay.createContainer(InfoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        config {
          wifiNetwork
          wifiPassword
        }
        faqs {
          question
          answer
        }
        pages {
          title
          url
          logo
        }
      }
    `,
  },
});

module.exports = F8InfoView;
