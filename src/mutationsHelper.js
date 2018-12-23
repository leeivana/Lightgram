import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './graphql/mutations';

const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    console.log('ERROR creating user info: ', response.errors.join('\n'));
  }
};

export const createUser = async user => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.CreateUser, { user })
    );
    assertErrors(response);
    return response.data.createUser;
  } catch (err) {
    console.log('Error creating user:', err);
  }
};
