using WebApp.Business.Models;

namespace WebApp.Business.Interfaces
{
    public interface IUserDataProvider
    {
        IEnumerable<User> GetAllUsers();

        User Add(User model);

        IEnumerable<User> GetByNamePattern(string pattern);

        User GetByEmail(string email);

        User GetById(int id);
    }
}
