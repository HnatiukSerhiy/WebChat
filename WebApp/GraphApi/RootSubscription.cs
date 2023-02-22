using WebApp.GraphApi.Subscriptions;

namespace WebApp.GraphApi;

public class RootSubscription
{
    public static MessagesSubscription Messages() => new();
}