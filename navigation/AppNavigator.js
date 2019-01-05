import { createSwitchNavigator } from 'react-navigation';

import MainAppNavigator from './MainAppNavigator';
import AuthScreenNavigation from './AuthScreenNavigation';
// import InitializingScreen from './InitializingScreen';

export default createSwitchNavigator({
  // Initializing: { screen: Initializing },
  Auth: { screen: AuthScreenNavigation },
  Main: { screen: MainAppNavigator },
});
