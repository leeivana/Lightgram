import { createSwitchNavigator } from 'react-navigation';

import MainAppNavigator from './MainAppNavigator';
import AuthScreenNavigation from './AuthScreenNavigation';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Initializing: { screen: Initializing },
  Auth: { screen: AuthScreenNavigation },
  Main: { screen: MainAppNavigator },
});
