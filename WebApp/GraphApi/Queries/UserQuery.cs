using GraphQL;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;

namespace WebApp.GraphApi.Queries;

public class UserQuery
{
    public static IEnumerable<User> GetAll([FromServices] IUserDataProvider dataProvider)
        => dataProvider.GetAllUsers();

    public static IEnumerable<User> SearchByName([FromServices] IUserDataProvider dataProvider, string? pattern)
        => dataProvider.GetByNamePattern(pattern);
}