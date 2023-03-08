using GraphQL;
using WebApp.Business.Models;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.GraphApi.Queries;

public class MessagesQuery
{
    public static IEnumerable<Message> GetAll([FromServices] IChatService chatService, int userId)
        => chatService.GetMessagesForUser(userId);

    public static IEnumerable<Chat> GetChats([FromServices] IChatService chatService, int userId)
        => chatService.GetChats(userId);
}