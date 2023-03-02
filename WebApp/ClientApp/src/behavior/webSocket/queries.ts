export const messagesSubscription = `
subscription messagesSubscription($userId:Int!){
  newMessages(userId:$userId){
    value
  }
}`;
