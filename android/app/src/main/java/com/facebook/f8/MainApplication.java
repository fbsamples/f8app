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

package com.facebook.f8;

import android.app.Application;
import android.content.Intent;

import com.BV.LinearGradient.LinearGradientPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.microsoft.codepush.react.CodePush;

import java.util.Arrays;
import java.util.List;

import cl.json.RNSharePackage;

public class MainApplication extends Application implements ReactApplication {
    
    private static CallbackManager mCallbackManager;
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    @Override
    public void onCreate() {
        super.onCreate();
        mCallbackManager = new CallbackManager.Factory().create();
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage();
        FacebookSdk.sdkInitialize(getApplicationContext());
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        /**
         * A list of packages used by the app. If the app uses additional views
         * or modules besides the default ones, add more packages here.
         */
        @Override
        protected List<ReactPackage> getPackages() {
            
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new LinearGradientPackage(),
                    new RNSharePackage(),
                    new RNSendIntentPackage(),
                    new CodePush("qwfkzzq7Y8cSrkiuU7aRCkIP7XYLEJ6b-AFoe", MainApplication.this, BuildConfig.DEBUG),
                    mReactNativePushNotificationPackage
                    //,this._pushNotification
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    // Add onNewIntent
    public void onNewIntent(Intent intent) {
      if ( mReactNativePushNotificationPackage != null ) {
          mReactNativePushNotificationPackage.newIntent(intent);
      }
   }

    // Add Get CallbackManager
    public static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }   
}

