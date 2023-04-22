export const messagesSubscription = `
subscription messagesSubscription($userId:Int!){
  newMessages(userId:$userId){
    id
    value
    currentUserId
    senderId
    receiverId
  }
}`;
