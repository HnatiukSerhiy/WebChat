using WebApp.Business.Models;

namespace WebApp.Business.Interfaces
{
    public interface IUserDataProvider
    {
        List<User> GetAllUsers();
        User Add(User model);
        User GetByEmail(string email);
        User GetById(int id);
    }
}
