using WebApp.GraphApi.Mutations;

namespace WebApp.GraphApi;

public class RootMutation
{
    public static AuthenticationMutation Authentication() => new();
}