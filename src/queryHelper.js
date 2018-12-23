import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';

const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    console.log('ERROR getting user info: ', response.errors.join('\n'));
  }
};

export const getUser = async (username: string) => {
  try {
    const response = await API.graphql(
      graphqlOperation(queries.GetUser, { id: username })
    );
    assertErrors(response);
    return response.data.getUser;
  } catch (err) {
    console.log('Error get user:', err);
  }
};
