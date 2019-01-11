// eslint-disable
// this is an auto generated file. This will be overwritten
import { API, graphqlOperation } from 'aws-amplify';

export const createUserMutation = `
mutation createUser($id: ID!, $given_name: String!, $family_name: String!, $phone_number: String!) {
  createUser(input: {
    id: $id,
    given_name: $given_name,
    family_name: $family_name,
    phone_number: $phone_number
  }) {
    id given_name family_name phone_number
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    given_name
    family_name
    phone_number
    conversations {
      items {
        id
        convoLinkUserId
        convoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        authorId
        content
        isSent
        messageConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const createConvo = `mutation CreateConvo($input: CreateConversationInput!) {
  createConvo(input: $input) {
    id
    messages {
      items {
        id
        authorId
        content
        isSent
        messageConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    associated {
      items {
        id
        convoLinkUserId
        convoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    name
    isEncrypted
    members
    createdAt
    updatedAt
  }
}
`;
const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};
export const createFullConvo = async (user1, user2) => {
  console.log('arguments', user1, user2);
  try {
    const members = [user1, user2].sort();
    const conversationName = user2;
    const conversationResponse = await API.graphql(
      graphqlOperation(this.CreateConvo, {
        input: {
          name: conversationName,
          members,
          isEncrypted: false,
        },
      })
    );
    // console.log('done conversation response ');
    // assertErrors(conversationResponse);
    // const userConversation1Response = await API.graphql(
    //   graphqlOperation(this.CreateConvoLink, {
    //     input: {
    //       convoLinkUserId: user1,
    //       convoLinkConversationId: conversationResponse.data.createConvo.id,
    //     },
    //   })
    // );
    // assertErrors(userConversation1Response);
    // const userConversation2Response = await API.graphql(
    //   graphqlOperation(this.CreateConvoLink, {
    //     input: {
    //       convoLinkUserId: user2,
    //       convoLinkConversationId: conversationResponse.data.createConvo.id,
    //     },
    //   })
    // );
    // assertErrors(userConversation2Response);
  } catch (e) {
    console.log(`error ${e}`);
  }
};
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    author {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    authorId
    content
    isSent
    recipient {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    conversation {
      id
      name
      isEncrypted
      members
      createdAt
      updatedAt
    }
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    author {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    authorId
    content
    isSent
    recipient {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    conversation {
      id
      name
      isEncrypted
      members
      createdAt
      updatedAt
    }
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    author {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    authorId
    content
    isSent
    recipient {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    conversation {
      id
      name
      isEncrypted
      members
      createdAt
      updatedAt
    }
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const createConvoLink = `mutation CreateConvoLink($input: CreateConvoLinkInput!) {
  createConvoLink(input: $input) {
    id
    user {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    convoLinkUserId
    conversation {
      id
      name
      isEncrypted
      members
      createdAt
      updatedAt
    }
    convoLinkConversationId
    createdAt
    updatedAt
  }
}
`;
export const updateConvoLink = `mutation UpdateConvoLink($input: UpdateConvoLinkInput!) {
  updateConvoLink(input: $input) {
    id
    user {
      id
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
    }
    convoLinkUserId
    conversation {
      id
      name
      isEncrypted
      members
      createdAt
      updatedAt
    }
    convoLinkConversationId
    createdAt
    updatedAt
  }
}
`;
export const CreateConvoLink = `
mutation CreateConvoLink($input: CreateConvoLinkInput!) {
  createConvoLink(input: $input) {
    id
    convoLinkUserId
    convoLinkConversationId
    conversation {
      id
      name
    }
  }
}
`;
export const CreateConvo = `
mutation CreateConvo($input: CreateConversationInput!) {
  createConvo(input: $input) {
    id
    name
    members
    isEncrypted
  }
}
`;
