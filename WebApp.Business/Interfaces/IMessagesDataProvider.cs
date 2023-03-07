using WebApp.Business.Models;

namespace WebApp.Business.Interfaces;

public interface IMessagesDataProvider
{
    IEnumerable<Message> GetFromUser(int userId);

    long Save(Message message);
}