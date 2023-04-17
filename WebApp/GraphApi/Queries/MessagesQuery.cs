using GraphQL;
using WebApp.Business.Models;
using WebApp.Interfaces;
using WebApp.Models;

namespace WebApp.GraphApi.Queries;

public class MessagesQuery
{
    public static IEnumerable<Message> GetAll([FromServices] IChatService chatService, int userId)
        => chatService.GetMessagesForUser(userId);

    [Name("GetChats")]
    public static Task<List<Chat>> GetChatsAsync([FromServices] IChatService chatService, int userId)
        => chatService.GetChats(userId);
}