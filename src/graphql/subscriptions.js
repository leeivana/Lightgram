// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateConvoLink = `subscription OnCreateConvoLink($convoLinkUserId: ID!) {
  onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
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
export const onCreateMessage = `subscription OnCreateMessage($messageConversationId: ID!) {
  onCreateMessage(messageConversationId: $messageConversationId) {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
