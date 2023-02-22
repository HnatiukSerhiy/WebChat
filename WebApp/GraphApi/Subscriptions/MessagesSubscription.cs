using GraphQL;
using WebApp.Interfaces;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.GraphApi.Subscriptions;

public class MessagesSubscription
{
    public static IObservable<Message> NewMessages([FromServices] IChatService chatService)
        => chatService.SubscribeAll();

    public static IObservable<Event> Events([FromServices] IChatService chatService)
        => chatService.SubscribeEvents();
}