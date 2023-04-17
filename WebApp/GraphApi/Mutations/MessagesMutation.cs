using GraphQL;
using WebApp.Business.Models;
using WebApp.GraphApi.Types.Messages;
using WebApp.Interfaces;

namespace WebApp.GraphApi.Mutations;

public class MessagesMutation
{
    public static Message Send([FromServices] IChatService chatService, MessageInput input)
        => chatService.PostMessage(input);
}