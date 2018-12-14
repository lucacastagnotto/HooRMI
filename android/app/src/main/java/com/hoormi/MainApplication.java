package com.hoormi;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import net.no_mad.tts.TextToSpeechPackage;
import com.wenkesj.voice.VoicePackage;
=======
>>>>>>> ea50577fbf5ef311ed51c60be83a6685f6ffba62
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new TextToSpeechPackage(),
            new VoicePackage(),
            new MapsPackage()
=======
            new MapsPackage(),
          new MapsPackage()
>>>>>>> ea50577fbf5ef311ed51c60be83a6685f6ffba62
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
