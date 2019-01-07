import { createSwitchNavigator } from 'react-navigation';
import Init from './Init';
import AuthScreenNavigation from './AuthScreenNavigation';
import MainAppNavigator from './MainAppNavigator';
import AboutScreen from '../screens/AboutScreen';
import ChatScreenStack from './ChatNavigator';

export default createSwitchNavigator({
  Init: { screen: Init },
  Auth: { screen: AuthScreenNavigation },
  About: { screen: AboutScreen },
  Main: { screen: MainAppNavigator },
  Chat: { screen: ChatScreenStack },
});
