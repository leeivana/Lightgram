import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { View, Text, StyleSheet } from 'react-native';

import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn,
  VerifyContact,
  withAuthenticator,
  Authenticator,
} from 'aws-amplify-react-native';

import SignUpScreen from './screens/SignUpScreen';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends React.Component {
  render() {
    return (
      <Authenticator 
      // Optionally hard-code an initial state
      authState="signIn",
      // Pass in an already authenticated CognitoUser or FederatedUser object
      authData={CognitoUser | 'username'} 
      // Fired when Authentication State changes
      onStateChange={(authState) => console.log(authState)} 
      // An object referencing federation and/or social providers 
      // *** Only supported on React/Web (Not React Native) ***
      // For React Native use the API Auth.federatedSignIn()
      federated={myFederatedConfig}
      // A theme object to override the UI / styling
      theme={myCustomTheme} 
      // Hide specific components within the Authenticator
      hide={ 
          [
              Greetings,
              SignIn,
              ConfirmSignIn,
              RequireNewPassword,
              SignUp,
              ConfirmSignUp,
              VerifyContact,
              ForgotPassword,
              TOTPSetup
          ]
      }
      // or hide all the default components
      hideDefault={true}
      // Pass in an aws-exports configuration
      amplifyConfig={myAWSExports}, 
      // Pass in a message map for error strings
      errorMessage={myMessageMap}
  >
      // Default components can be customized/passed in as child components. 
      // Define them here if you used hideDefault={true}
      <Greetings/>
      <SignIn federated={myFederatedConfig}/>
      <ConfirmSignIn/>
      <RequireNewPassword/>
      <SignUp/>
      <ConfirmSignUp/>
      <VerifyContact/>
      <ForgotPassword/>
      <TOTPSetup/>
  </Authenticator>
    );
  }
}

// export default withAuthenticator(App, false, [
//   <SignIn />,
//   <ConfirmSignIn />,
//   <SignUpScreen />,
//   <ConfirmSignUp />,
//   <ForgotPassword />,
// ]);
