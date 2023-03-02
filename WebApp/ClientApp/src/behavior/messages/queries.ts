export const sendMessageMutation = `
mutation sendMessage($input:MessageInput!){
  messages{
    send(input:$input){
      value
    }
  }
}`;
