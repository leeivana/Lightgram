import { createSwitchNavigator } from 'react-navigation';

import InitializingScreen from './InitializingScreen';
import AuthScreenNavigation from './AuthScreenNavigation';
import MainAppNavigator from './MainAppNavigator';
import ChatScreenStack from './ChatNavigator';

export default createSwitchNavigator({
  Initializing: { screen: InitializingScreen },
  Auth: { screen: AuthScreenNavigation },
  Main: { screen: MainAppNavigator },
  Chat: { screen: ChatScreenStack },
});
