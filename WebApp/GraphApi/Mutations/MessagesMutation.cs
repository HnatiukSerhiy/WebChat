using GraphQL;
using WebApp.GraphApi.Types.Messages;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.GraphApi.Mutations;

public class MessagesMutation
{
    public static Message Send([FromServices] IChatService chatService, MessageInput input)
        => chatService.PostMessage(input);
}