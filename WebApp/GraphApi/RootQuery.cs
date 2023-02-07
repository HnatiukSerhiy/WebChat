using WebApp.GraphApi.Queries;

namespace WebApp.GraphApi;

public class RootQuery
{
    public static UserQuery User() => new();
}