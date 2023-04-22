export const sendMessageMutation =
`mutation sendMessage($input:MessageInput!){
  messages{
    send(input:$input){
      id
      messages {
        id
        value
        senderId
        receiverId
      }
    }
  }
}`;

export const getChatsQuery =
`query getChats($input:Int!){
  messages{
    getChats(userId:$input){
      id
      messages{
        id
        value
        senderId
        receiverId
      }
    }
  }
}`;
