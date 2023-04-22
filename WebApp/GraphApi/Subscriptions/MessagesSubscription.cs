using GraphQL;
using WebApp.Business.Models;
using WebApp.Interfaces;

namespace WebApp.GraphApi.Subscriptions;

public class MessagesSubscription
{
    public static IObservable<SubscriptionMessageResponse> NewMessages([FromServices] IChatService chatService, int userId)
        => chatService.SubscribeForReceiving(userId);
}