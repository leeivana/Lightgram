import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import AppNavigator from './navigation/AppNavigator';
import Provider from './src/mobx';
import awsconfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: 'us-east-1',
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

Amplify.configure(awsconfig);

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      </Provider>
    );
  }
}
