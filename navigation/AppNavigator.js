import { createSwitchNavigator } from 'react-navigation';

import InitializingScreen from './InitializingScreen';
import AuthScreenNavigation from './AuthScreenNavigation';
import MainAppNavigator from './MainAppNavigator';

export default createSwitchNavigator({
  Initializing: { screen: InitializingScreen },
  Auth: { screen: AuthScreenNavigation },
  Main: { screen: MainAppNavigator },
});
