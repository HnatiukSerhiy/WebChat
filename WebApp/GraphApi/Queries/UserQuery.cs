using GraphQL;
using WebApp.Business.Interfaces;
using WebApp.Business.Models;

namespace WebApp.GraphApi.Queries;

public class UserQuery
{
    [Authorize]
    public static List<User> GetAll([FromServices] IUserDataProvider dataProvider) => dataProvider.GetAllUsers();
}