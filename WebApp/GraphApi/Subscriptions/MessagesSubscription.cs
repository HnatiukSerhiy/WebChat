using GraphQL;
using WebApp.Business.Models;
using WebApp.Interfaces;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.GraphApi.Subscriptions;

public class MessagesSubscription
{
    [Authorize]
    public static IObservable<Message> NewMessages([FromServices] IChatService chatService, int userId)
        => chatService.SubscribeForReceiving(userId);
}