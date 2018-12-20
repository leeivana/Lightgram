// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    fistName
    lastName
    phoneNumber
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fistName
      lastName
      phoneNumber
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
    nextToken
  }
}
`;
export const getConvo = `query GetConvo($id: ID!) {
  getConvo(id: $id) {
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
