export const sendMessageMutation =
`mutation sendMessage($input:MessageInput!){
  messages{
    send(input:$input){
      value
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
