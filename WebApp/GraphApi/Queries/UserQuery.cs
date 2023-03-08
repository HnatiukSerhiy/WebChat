using GraphQL;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;

namespace WebApp.GraphApi.Queries;

public class UserQuery
{
    [Authorize]
    public static IEnumerable<User> GetAll([FromServices] IUserDataProvider dataProvider)
        => dataProvider.GetAllUsers();

    [Authorize]
    public static IEnumerable<User> SearchByName([FromServices] IUserDataProvider dataProvider, string pattern)
        => dataProvider.GetByNamePattern(pattern);
}