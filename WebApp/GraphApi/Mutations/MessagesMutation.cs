using GraphQL;
using WebApp.Business.Models;
using WebApp.GraphApi.Types.Messages;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.GraphApi.Mutations;

public class MessagesMutation
{
    [Authorize]
    public static Message Send([FromServices] IChatService chatService, MessageInput input)
        => chatService.PostMessage(input);
}