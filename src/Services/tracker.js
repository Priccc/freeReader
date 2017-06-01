import Config from 'react-native-config';
import { StatusBar } from 'react-native';

import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

GoogleAnalyticsSettings.setDispatchInterval(30);
GoogleAnalyticsSettings.setDryRun(Config.ENV !== 'production');

const tracker = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS_ID);

// @link https://reactnavigation.org/docs/guides/screen-tracking
// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }

  return route.routeName;
};

const trackPageView = (prevState, currentState) => {
  const currentScreen = getCurrentRouteName(currentState);
  const prevScreen = getCurrentRouteName(prevState);
  StatusBar.setBarStyle('light-content');

  if (prevScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    tracker.trackScreenView(currentScreen);
  }
};

module.exports = tracker;
module.exports.trackPageView = trackPageView;
