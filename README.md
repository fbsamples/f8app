# F8 App 2016

This is the entire source code of the official [F8](https://fbf8.com/) app of 2016, available on [Google Play](https://play.google.com/store/apps/details?id=com.facebook.f8) and the [App Store](https://itunes.apple.com/us/app/f8/id853467066).

<img src=".github/screenshot-app@2x.png" width="800">

## How We Build It

We've created a series of tutorials at [makeitopen.com](http://makeitopen.com/) that explain how we built the app, and that dive into how we used React Native, Redux, Relay, GraphQL, and more.

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 7.3 +
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)
3. [MongoDB](https://www.mongodb.org/downloads) (needed to run Parse Server locally)

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/fbsamples/f8app.git
  $ cd f8app
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  $ (cd ios; pod install)        # only for iOS version
  ```

3. **Make sure MongoDB is running:**

  ```
  $ lsof -iTCP:27017 -sTCP:LISTEN
  ```

  NOTE: if installed with [Homebrew](http://brew.sh/) run `brew info mongo` and
  check out the Caveats section.

  If you prefer to use an external MongoDB server, set `DATABASE_URI`:

  ```
  $ export DATABASE_URI=mongodb://example-mongo-hosting.com:1337/my-awesome-database
  ```

4. **Start Parse/GraphQL servers:**

  ```
  $ npm start
  ```
  
  NOTE: To access to Parse Dashboard via browser, you should set below two env variables.
  
  ```
  $ export PARSE_DASHBOARD_ALLOW_INSECURE_HTTP=1
  $ export DASHBOARD_AUTH=$username:$password #set username & password you want.
  ```

5. **Import sample data** (the local Parse Server should be running):

  ```
  $ npm run import-data
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

  <img src=".github/screenshot-server@2x.png" width="800">


6. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  $ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
  ```


7. **Running on iOS:**

  ```
  $ react-native run-ios
  ```
