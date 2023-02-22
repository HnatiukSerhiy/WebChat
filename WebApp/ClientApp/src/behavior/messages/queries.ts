export const sendMessageMutation = `
mutation sendMessage($message:String!){
  messages{
    send
  }
}`;
