// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
